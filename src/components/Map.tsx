import GoogleMapReact from "google-map-react";

interface MapProps {
  latitude: number | null;
  longitude: number | null;
}

export default function Map(props: MapProps) {

  if(!props.latitude || !props.longitude) {
    return null;
  }

  return (
    <GoogleMapReact
          bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
          defaultCenter={{lat: props.latitude, lng: props.longitude}}
          defaultZoom={15}
        >
    </GoogleMapReact>
  );
}