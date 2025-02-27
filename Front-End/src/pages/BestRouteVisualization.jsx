import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import polyline from 'polyline';
import { useContext, useEffect, useState } from "react";
import { RouteContext } from "../context/RouteContext";

export default function BestRouteVisualization() {
  const { route } = useContext(RouteContext);
  const [currentPosition, setCurrentPosition] = useState(null);
  
  console.log("Stored route data in visualization: ", route);

  // 🔹 Ensure route data is available
  if (!route || (!route.points && !route.route_data)) {
    return <p>Loading route data...</p>;
  }

  const routeData = {
    points: route.points || route.route_data?.points || "",
    bbox: route.bbox || route.route_data?.bbox || [0, 0, 0, 0]
  };

  console.log("Processed route data in visualization: ", routeData);

  // 🔹 Check if points exist
  if (!routeData.points) {
    return <p>No route data available</p>;
  }

  // 🔹 Decode polyline safely
  let decodedPoints = [];
  try {
    decodedPoints = polyline.decode(routeData.points);
  } catch (error) {
    console.error("Error decoding polyline:", error);
    return <p>Error displaying route</p>;
  }

  // 🔹 Calculate map center (fallback to a default location)
  const mapCenter = routeData.bbox.length === 4
    ? [(routeData.bbox[1] + routeData.bbox[3]) / 2, (routeData.bbox[0] + routeData.bbox[2]) / 2]
    : [0, 0];

  // 🔹 Get current location of the user
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error fetching current location:", error);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // 🔹 Map component to adjust view based on live position
  function MapUpdater({ position }) {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.flyTo(position, 13);
      }
    }, [position, map]);
    return null;
  }

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />

      {/* Display the route if points are available */}
      {decodedPoints.length > 0 && <Polyline positions={decodedPoints} color="blue" />}

      {/* Add markers for start and end points */}
      {decodedPoints.length > 0 && (
        <>
          <Marker position={decodedPoints[0]}>
            <Popup>Start Point</Popup>
          </Marker>
          <Marker position={decodedPoints[decodedPoints.length - 1]}>
            <Popup>End Point</Popup>
          </Marker>
        </>
      )}

      {/* Add live location marker */}
      {/* {currentPosition && (
        <>
          <Marker position={currentPosition}>
            <Popup>Your Current Location</Popup>
          </Marker>
          <MapUpdater position={currentPosition} />
        </>
      )} */}
    </MapContainer>
  );
}
