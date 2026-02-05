import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { initializeMap, cleanupMap } from '../utils/mapInitializer';

interface UseMapParams {
  latitude: number;
  longitude: number;
  name: string;
}

/**
 * Hook for managing Leaflet map lifecycle
 * Handles map initialization, updates, and cleanup
 */
export function useMap({ latitude, longitude, name }: UseMapParams) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = initializeMap({
      container: mapRef.current,
      latitude,
      longitude,
      name,
    });

    mapInstanceRef.current = map;

    // Cleanup function
    return () => {
      cleanupMap(mapInstanceRef.current);
      mapInstanceRef.current = null;
    };
  }, [latitude, longitude, name]);

  return mapRef;
}
