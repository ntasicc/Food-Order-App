import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { libraries, mapContainerStyle, center } from "./MapConst";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./Map.module.css";

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_MAP_KEY}`,
    libraries,
  });

  let content = (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      center={center}
    >
      <Marker
        key={`${center.lat - center.lng}`}
        position={{
          lat: center.lat,
          lng: center.lng,
        }}
      />
    </GoogleMap>
  );

  if (loadError) return "Error loading map";
  if (!isLoaded) content = <LoadingSpinner />;

  return <div className={classes.map}>{content}</div>;
};

export default Map;
