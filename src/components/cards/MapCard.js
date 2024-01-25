import { useJsApiLoader } from "@react-google-maps/api";

import Map from "../Map";
import { mapOptions } from "../Maconfiguration";

// lat 6.5244   lng 3.3792
export default function MapCard({ ad, related }) {
  const { isLoaded } = useJsApiLoader({
    id: mapOptions.googleMapApiKey,
    googleMapsApiKey: mapOptions.googleMapApiKey,
  });

  if (ad?.landmarkLocation?.coordinates?.length) {
    return (
      <div style={{ width: "100%", height: "280px" }}>
        <Map ad={ad} isLoaded={isLoaded} related={related}></Map>
      </div>
    );
  }
}
