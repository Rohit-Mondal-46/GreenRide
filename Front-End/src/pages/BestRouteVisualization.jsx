import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import polyline from 'polyline';

// Data from your backend
const routeData = {
  "points": "g{pnCo_|sO_Hu@eFH{F|@aBT_BJa@@SA[DuABo@AEBE?[NMLQRQZk@vAYz@EZoBdFmAzBkAdBw@lAm@nAcGrMsK~Ua@z@Yb@a@d@iAdCCPETGRUn@qB~EmP~^kG|MgEnJ]t@_Ac@kBfEsDjI_@s@{@g@mA[eAOoAEaBvEqAzCoBnEq@hCoCrHi@rAuBhGQX@BmCfC|BvDrAlA}DlIyFpMuExJwCzGkE~HoEvHm@fAcE~GcBtC{@lAgApBkKhPFV{PlWm@ZcHjKwN`TuQrXv@n@gGzIuMvRyDbGyGxJ_BfCmAnBg@r@WTiGbJnXrQf@Vr@z@t@zA|@fAl@ZtBIkArE}Hf\\Qp@b@RTFJHHJFJpA~ECR@FBDbCdCr@x@v@dAXl@\\j@d@j@|@v@dBxBz@n@\\Z^h@DZ?VeCpRS|@c@~Be@xA[j@m@hBKf@YbA}@nCyBjEyCjHyAhDiB`Es@bCqAxDu@xCg@dB_@jB_ArFo@xCo@lCw@tDCZDh@Eh@WdCc@~Eg@|COj@SXaAv@MRg@hA_AxC}B|Hk@|AcD|FcGfRbCdAeEzMGIaAfBkArCaBvD{F|PcAdDs@dBiBfD]`@oEnCoC~CUN_D`@s@Ca@Ni@|@wCjEiPvMz@`CNt@t@lAHRH^LpAHp@?LIHwAlAy@fAy@zAIx@CbAK~@Kr@Kj@Yn@iBbCg@tA_@|ABZN`AE\\[dAI`@G`@G\\Wl@m@x@cEtEeAxAcApAI^q@dE]lB[pBWxA]rDUrB]lCGd@QvCCp@QxBkAlIKf@UdAKZi@bA}@lBWp@_@fAc@bBa@fBO`AUnBCROdE]~E?b@Nn@F^DlA?l@C^IdAEv@?\\@\\DZx@lDZhAN|@@V@XA\\C^W|AaApFi@nCw@jD]rA]hAKXa@p@Wb@aChDe@l@c@d@q@p@s@j@ONKNIPIVUz@gAtF[tA{AtHaAzEsAfGmA`G}@fDKl@Gj@A^AhDCh@EZa@xBa@nBWbAe@rAQ\\QZw@hAu@xAS\\Yd@GLCLM|@GXKZ[b@UXW\\[h@q@|AIZOt@aAtDq@xDa@rB_@|BS~ASlBM\\gAhBS\\_ApAuG`GeAhA~A|AvCzC^b@rAfCL\\FX@`@CRr@|@BFAJCFsBvD\\\\RRVTb@d@@D@HCLy@|D_BhIuAxFcB|H{@vEs@tDYnAkArEKLs@hBaAfDo@lCGLKFRvADb@?fBHv@Hd@Pr@L^B^?\\E^i@fCGNU^ORMXYrACZAb@H~DHz@TdARh@Xb@VZhF~DPPjAdBJJFTBTBVCX_@pBCZ?Rd@bGBPJ`@RzCR~EDxD?b@C`@S`DDVFLk@`AENId@EJIHGDG?QAYGeAc@OAm@@m@GQ?UFy@Xu@`@{@`@UHsAP_B`@u@Lu@R]F[@iAPWLOLOTGNO`AOJa@^s@`AqB|D{DfFOZ_@~@Sp@a@pBQp@c@hAeB|DgBbEmA`D_@l@i@t@YXa@XMLMRs@`BARE^Ah@IhLEv@@VDVn@xBNb@RX`AdA^\\RJv@TTJj@b@RHPBRAZO|@]V?RDTJv@|@pB~Bx@lAx@hBJ\\XhBNl@YrCK^GNQRhAD^DXF`A\\QRWh@Ob@Kb@Qx@O^[t@Q\\O^UnBI`@O\\OVoAjAY^S^Sj@GXKfAOTM`@Gd@O|DYnCQv@Qj@_@bAi@pAUp@uAvFWzAEn@?ZP|BBb@A\\Gb@cA|EQlAMtAIvAEvCCpBEh@OhA?j@JhEHhGC`@Kh@Uf@M`@K^E^Al@?x@PbFApAEpAIp@Qp@Q`AGr@GNILQDwABKBIHGLERCXIbACx@@r@Dn@Dt@GjBGx@Kt@EN]rA[l@W\\i@Vm@T[Ra@b@c@t@y@tB}@|B_AxBa@dAU~@a@tB_@vAWp@[r@iAlBkBlDc@l@k@|@g@|@w@fAk@|@Ub@]t@]z@oAvDUz@Kt@WxBI^O\\Wb@[\\SLSBi@AQFMLOF_BD[@QFQPk@zAUx@Yx@Q`@UZ_@VmAb@yCv@i@Ja@?Bl@?JANM\\s@xAENE^EJWXGHCLA`AGROFQDUF_@D_AAOBqA\\S@}@AiABe@Dm@LcDz@iATa@Nc@`@QRUf@IFw@\\SJSZMNKF_@LkBl@a@BWD]RUDQ@WC_@GQAO?kAj@g@^]\\ONUJM@m@BUFa@Rc@Z]b@QZIJODo@NWp@ELMHeB`@OH[PIBS@IPGDeBbAYT[NODk@Nq@Jg@HUF]JaBj@g@X_Ap@e@`@QLiAd@YNq@h@OJSDa@BaAT_@NkBz@SF_@Fe@VKISISCiAIWEWGe@WM?MB[TeAlAOL}@d@_@V_CbBe@RcA\\c@LYDQBk@?OKQb@ILWRKPGRK`@CTAX?`@Eh@AJsBe@q@IMEIIgBu@I@C@KVGTETCVIhBKh@ENOX_@PCB}@nBEFID[NUPKJQTWl@E?Ef@ETKNQRKDG?MAwAm@_@nAoAnCSTw@`@mAx@mGbDc@ZaCHQBMFaAb@cA`@{@Ra@q@KKg@a@eBiAkA@MDIH[h@OHKDyAHaA@gAL_@Dc@AeCTO?MAICgAd@ED[BSHgBz@GFEHCLC`@EjACLGHGFi@NUFOBkDM]@K@GFcBxBKNCJCl@Ob@KP_AbAwEzDiC~B[^ELEVKt@i@HmAf@_@RoAd@s@Tq@Js@FkBDWAQb@oAdBuAbBeAdAa@d@_@Xy@h@SPU^K^Gd@Gn@EXMXYb@_@d@cAhAKPETs@@SA]EOxFs@?kBAJjCL^XRl@`@d@\\[`AoAe@_AhCg@|Am@zAYOk@tAWn@s@lBEC[v@}AxCCFMx@Qd@j@Nx@\\]nASx@Sh@CF]`@M\\CDWPEFe@nAu@~Cc@zBaAOk@CQFUNSR_@r@K\\K`AGz@CdBC^E`CBrACh@G^Q~@m@pBCR?VNfBB`BBp@Wl@WbAOn@Oh@o@~Aa@r@u@dAINUj@KRq@t@g@r@Wb@MLUPmAp@k@h@QVG\\M^SjAoA@WBk@HgARUDy@FYHq@ZYJOBQ@YAsAbGo@|BoErR]IiBw@o@KqBdJiD~LqAnGyBbItCf@cF|SE`AXPBF?FiAhFWGWIuCdLeBlHq@xCALAf@o@dC",
  "bbox": [87.311920, 23.520445, 86.953110, 23.693029],
};

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
console.log('decoded points in map.jsx: ',decodedPoints);

export default function BestRouteVisualization() {
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
