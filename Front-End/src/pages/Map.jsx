import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import polyline from 'polyline';

// Data from your backend
const routeData = {
  "points": "wq{hC{o|sOp@gBl@}BT{@vD}LHk@FoADsBHiARyB\\CJCHCJIHCHAJ?VDL@TETAzC@lBAHADC@CBK@e@FC\\SFAHAr@NbBD|EAbB@vIKHERMPKJCPDNNTNPDbKEtIFt@Az@CtDCLAFEDEDUBe@D]l@qDFOBGNGx@_FhAmGdD_QfC_H|AyDHSp@`Ab@hAJRPPx@h@|@b@NDvBNtCXfBXtAXN?HCNMVYHORc@HMHGJCJA|GXdGl@HATGZAhBT`@BP@NANGt@]f@]`@QLGnBWr@Af@B~AXIlB@fBFhBB~AKbDxEv@`@LbCbAxBx@nATpAPXFtAl@XFR@VAZGTMREh@CPGRMRWRMTA`GZbBL`ANl@N^L`@Tf@Zh@X`@Hj@Fx@CLAHG@K@QCqEOiH@o@Be@F[LWR[bA{@Z]j@}@TY~A}B~BqCxr@xA~d@`AVHVDVDx@AvAGbBD~@KNAt@{AXe@^g@lAkAf@o@FEk@qAGMCMAMHyB@UBGDG^[LG`@Mh@ITIn@WPKHCJ?^BZD`ABpC@|CFxBFbADtAVJ@v@EPEl@S^If@Q^E`AGRELGtDgCjB_Aj@]BM|@sA`@q@Ra@b@oAP_@R[v@{@JS^eATy@Fe@BUAg@Cc@?a@DkBDc@Pq@hAuDRy@P}@Fi@NaBN}BHcD?m@",
  "bbox": [87.314064, 22.525176, 87.342012, 22.592441],
};

// Decode the polyline
const decodedPoints = polyline.decode(routeData.points);

export default function RouteMap() {
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
