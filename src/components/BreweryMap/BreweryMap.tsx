import 'leaflet/dist/leaflet.css';
import { useMap } from './hooks/useMap';

interface BreweryMapProps {
  latitude: number;
  longitude: number;
  name: string;
}

/**
 * BreweryMap component
 * Displays a Leaflet map with a marker at the brewery location
 */
export function BreweryMap({ latitude, longitude, name }: BreweryMapProps) {
  const mapRef = useMap({ latitude, longitude, name });

  return (
    <div
      ref={mapRef}
      className="w-full h-64 rounded-lg border border-gray-600 dark:border-gray-600"
      style={{ zIndex: 0 }}
    />
  );
}
