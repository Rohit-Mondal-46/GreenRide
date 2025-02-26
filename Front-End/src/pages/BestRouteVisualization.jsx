import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import polyline from 'polyline';
import { useContext } from "react";
import { RouteContext } from "../context/RouteContext";


export default function BestRouteVisualization() {
  const { route } = useContext(RouteContext);
  console.log("store route data, in visualization: ",route);
  const routeData = {
    "points":route.points || route.route_data.points ,
    "bbox": route.bbox || route.route_data.bbox 
  };  
  
    console.log("Route data in visualization: ",routeData);
    
  
  // Decode the polyline
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
  
  
  const decodedPoints = polyline.decode(routeData.points);
  // const decodedPoints = decodePolyline(routeData.points)
  // console.log('decoded points in map.jsx: ',decodedPoints);
  


  // Center of the map (approx. middle of the bounding box)
  const mapCenter = [
    (routeData.bbox[1] + routeData.bbox[3]) / 2, // latitude
    (routeData.bbox[0] + routeData.bbox[2]) / 2, // longitude
  ];

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />

      {/* Display the route */}
      <Polyline positions={decodedPoints} color="blue" />

      {/* Optionally, add markers at start and end points */}
      <Marker position={decodedPoints[0]}>
        <Popup>Start Point</Popup>
      </Marker>
      <Marker position={decodedPoints[decodedPoints.length - 1]}>
        <Popup>End Point</Popup>
      </Marker>
    </MapContainer>
  );
}
