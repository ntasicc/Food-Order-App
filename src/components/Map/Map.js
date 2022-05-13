import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { libraries, mapContainerStyle, center } from "./MapConst";
import classes from "./Map.module.css";

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_MAP_KEY}`,
    libraries,
  });

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading Map";

  return (
    <div className={classes.map}>
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
    </div>
  );
};

export default Map;
