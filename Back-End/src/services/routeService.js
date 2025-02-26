const axios = require('axios');
const { pool } = require('../config/database');

const GRAPHHOPPER_BASE_URL = 'https://graphhopper.com/api/1';
const OPENWEATHERMAP_BASE_URL = 'https://api.waqi.info/feed/geo:';

// Mode-specific weights for AQI impact
const MODE_WEIGHTS = {
  walking: 1.0,
  cycling: 0.8,
  driving: 0.3
};

// Mode mapping for GraphHopper API
const MODE_TO_VEHICLE_MAP = {
  walking: 'foot',
  cycling: 'bike',
  driving: 'car'
};

// Weighting factors for AQI calculation
const AQI_WEIGHTS = {
  START: 0.2,   // Start of route
  MIDDLE: 0.5,  // Mid-route
  END: 0.3      // End of route
};

const getOptimizedRoutes = async (startPoint, endPoint, mode) => {
  try {
    // Check cache first
    const cachedRoute = await getCachedRoute(startPoint, endPoint, mode);
    
    if (cachedRoute) {
      return cachedRoute;
    }

    // Get routes from GraphHopper
    const routes = await fetchRoutes(startPoint, endPoint, mode);
    
    // Get AQI data for each route
    const routesWithAQI = await Promise.all(
      routes.map(async (route) => {
        const aqiData = await getAQIDataForRoute(route);
        const healthScore = calculateHealthScore(aqiData, mode);
        return { ...route, healthScore };
      })
    );

    // Sort routes by health score (lower is better)
    const optimizedRoutes = routesWithAQI.sort((a, b) => a.healthScore - b.healthScore);

    //select the route with least aqi, as it is sorted take 0th index
    const routeWithLeastAqi = optimizedRoutes[0]



    // Cache the results
    await cacheRoute(routeWithLeastAqi, startPoint, endPoint, mode);

    return routeWithLeastAqi;
  } catch (error) {
    console.error('Error in route optimization:', error);
    throw error;
  }
};

const fetchRoutes = async (startPoint, endPoint, mode) => {
  try {
    const vehicle = MODE_TO_VEHICLE_MAP[mode] || 'car';
    
    // First try with alternative_route algorithm
    const altParams = new URLSearchParams();
    altParams.append('point', `${startPoint.lat},${startPoint.lng}`);
    altParams.append('point', `${endPoint.lat},${endPoint.lng}`);
    altParams.append('profile', vehicle);
    altParams.append('algorithm', 'alternative_route');
    altParams.append('ch.disable', 'true');
    altParams.append('alternative_route.max_paths', '3');
    altParams.append('alternative_route.max_weight_factor', '1.4');
    altParams.append('alternative_route.max_share_factor', '0.6');
    altParams.append('points_encoded', 'true');
    altParams.append('instructions', 'true');
    altParams.append('elevation', 'false');
    altParams.append('key', process.env.GRAPHHOPPER_API_KEY);

    // console.log('Trying alternative routes with params:', Object.fromEntries(altParams));
    
    let response = await axios.get(`${GRAPHHOPPER_BASE_URL}/route`, {
      params: altParams
    });

    // If no alternative routes found, try with different parameters
    if (!response.data.paths || response.data.paths.length <= 1) {
      // console.log('No alternative routes found with first attempt, trying with relaxed parameters...');
      
      // Try with different start/end points slightly offset from original
      const routes = [];
      const offsets = [0, 0.001, -0.001]; // Approximately 100m offsets

      for (const latOffset of offsets) {
        for (const lngOffset of offsets) {
          if (latOffset === 0 && lngOffset === 0) continue; // Skip the original point

          const params = new URLSearchParams();
          params.append('point', `${startPoint.lat + latOffset},${startPoint.lng + lngOffset}`);
          params.append('point', `${endPoint.lat},${endPoint.lng}`);
          params.append('profile', vehicle);
          params.append('points_encoded', 'true');
          params.append('instructions', 'true');
          params.append('elevation', 'false');
          params.append('key', process.env.GRAPHHOPPER_API_KEY);

          try {
            const resp = await axios.get(`${GRAPHHOPPER_BASE_URL}/route`, {
              params: params
            });
            if (resp.data.paths && resp.data.paths[0]) {
              routes.push(resp.data.paths[0]);
            }
          } catch (err) {
            // console.log(`Failed to get route for offset [${latOffset}, ${lngOffset}]`);
          }
        }
      }

      if (routes.length > 0) {
        // console.log(`Found ${routes.length} alternative routes using offset method`);
        return routes;
      }
    }

    if (!response.data.paths || response.data.paths.length === 0) {
      throw new Error('No routes found');
    }

    // console.log(`Found ${response.data.paths.length} routes`);
    return response.data.paths;
  } catch (error) {
    console.error('Error fetching routes:', error.response?.data || error.message);
    throw error;
  }
};

const getAQIDataForRoute = async (route) => {
  try {
    // Sample points along the route
    const points = sampleRoutePoints(route);
    console.log('Sampled points:', points);
    
    // Fetch AQI data for each point
    const aqiPromises = points.map(point => {
      // console.log(`Fetching AQI data for point: [${point.lat}, ${point.lng}]`); 
      return axios.get(`${OPENWEATHERMAP_BASE_URL}${point.lat};${point.lng}/?token=${process.env.WAQI_API_KEY}`);
    });

    const aqiResponses = await Promise.all(aqiPromises);
    const temp = aqiResponses.map(response => response.data.data.aqi);
    // console.log('aqi data for route: ',temp);
    return temp;
  } catch (error) {
    console.error('Error fetching AQI data:', error);
    throw error;
  }
};


const calculateHealthScore = (aqiData, mode) => {
  // If not enough AQI data points, return null or a high score
  if (!aqiData || aqiData.length < 3) {
    console.warn('Not enough AQI data points for health score calculation');
    return null;
  }

  // For bike mode, use weighted AQI calculation
  if (mode === 'cycling') {
    const startAQI = aqiData[0];
    const endAQI = aqiData[aqiData.length - 1];
    
    // For midpoint, take the average of all middle points
    const middlePoints = aqiData.slice(1, -1);
    const midpointAQI = middlePoints.reduce((sum, aqi) => sum + aqi, 0) / middlePoints.length;

    // Calculate weighted average
    const weightedAQI = (
      AQI_WEIGHTS.START * startAQI +
      AQI_WEIGHTS.MIDDLE * midpointAQI +
      AQI_WEIGHTS.END * endAQI
    );

    return weightedAQI; 
  }

  // For other modes (if needed in future), return simple average
  const averageAQI = aqiData.reduce((sum, aqi) => sum + aqi, 0) / aqiData.length;
  return averageAQI * (MODE_WEIGHTS[mode] || 1.0);
};

// Polyline decoder function
const decodePolyline = (encoded, multiplier = 1e5) => { 
  const points = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let b; // Declare `b` at the start of each loop scope

    // Decode latitude
    do {
      b = encoded.charCodeAt(index++) - 63;  // Use `b` inside the loop
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);  // Fix breaking condition
    lat += ((result & 1) ? ~(result >> 1) : (result >> 1));

    shift = 0;
    result = 0;
    // Decode longitude
    do {
      b = encoded.charCodeAt(index++) - 63;  // Use `b` inside the loop
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);  // Fix breaking condition
    lng += ((result & 1) ? ~(result >> 1) : (result >> 1));

    points.push({
      lat: lat / multiplier,
      lng: lng / multiplier
    });

    // Add detailed logging to trace decoding process
    // console.log(`Decoded point: [${lat / multiplier}, ${lng / multiplier}] (lat: ${lat}, lng: ${lng})`);
  }

  // console.log("Final decoded points:", points);
  return points;
};



const sampleRoutePoints = (route) => {
  // Decode the polyline
  const allPoints = decodePolyline(route.points, route.points_encoded_multiplier || 1e5);
  
  // Calculate total distance
  const totalDistance = route.distance; // in meters
  
  // We want to sample points roughly every 1000 meters
  const sampleDistance = 1000;
  const numSamples = Math.max(3, Math.ceil(totalDistance / sampleDistance));
  
  const sampledPoints = [];
  
  // Always include start point
  sampledPoints.push(allPoints[0]);
  
  // Sample points at regular intervals
  for (let i = 1; i < numSamples - 1; i++) {
    const index = Math.floor((i * (allPoints.length - 1)) / (numSamples - 1));
    sampledPoints.push(allPoints[index]);
  }
  
  // Always include end point
  sampledPoints.push(allPoints[allPoints.length - 1]);
  
  // Log the sampled points for debugging
  // console.log(`Sampled points for route:`, sampledPoints);

  return sampledPoints;
};


const getCachedRoute = async (startPoint, endPoint, mode) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM routes 
       WHERE start_lat = $1 AND start_lng = $2
       AND end_lat = $3 AND end_lng = $4
       AND mode = $5
       AND created_at > NOW() - INTERVAL '1 hour'
       ORDER BY health_score
       LIMIT 1`,  // Ensure we get only one cached route
      [startPoint.lat, startPoint.lng, endPoint.lat, endPoint.lng, mode]
    );
    
    // Return the first route if available, else return null
    return result.rows.length > 0 ? result.rows[0] : null;
  } finally {
    client.release();
  }
};


const cacheRoute = async (route, startPoint, endPoint, mode) => {
  const client = await pool.connect();
  try {
    // Create a clean route object without circular references
    const routeData = {
      distance: route.distance,
      weight: route.weight,
      time: route.time,
      transfers: route.transfers,
      points_encoded: route.points_encoded,
      bbox: route.bbox,
      points: route.points,
      instructions: route.instructions,
      legs: route.legs,
      details: route.details,
      ascend: route.ascend,
      descend: route.descend,
      snapped_waypoints: route.snapped_waypoints
    };

    await client.query(
      `INSERT INTO routes (start_lat, start_lng, end_lat, end_lng, route_data, aqi_data, health_score, mode)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        startPoint.lat, startPoint.lng,
        endPoint.lat, endPoint.lng,
        JSON.stringify(routeData),
        JSON.stringify(route.aqiData || []),
        route.healthScore,
        mode
      ]
    );
  } finally {
    client.release();
  }
};


const getRouteById = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM routes WHERE id = $1', [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};


module.exports = {
  getOptimizedRoutes,
  getRouteById,
  fetchRoutes,
  getAQIDataForRoute,
  calculateHealthScore,
  sampleRoutePoints
}; 