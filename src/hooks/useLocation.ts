import { useEffect, useState } from "react";

interface Geolocation {
  latitude: number;
  longitude: number;
}

export default function useLocation() {
    const [location, setLocation] = useState<Geolocation | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        function success(position: GeolocationPosition) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            setLocation({
                latitude,
                longitude,
            });
        }

        function error() {
            setError('Unable to retrieve your location');
        }

        navigator.geolocation.getCurrentPosition(success, error);
    }, []);

    return { location, error };
}