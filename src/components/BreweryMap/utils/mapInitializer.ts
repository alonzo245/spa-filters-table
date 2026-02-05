import L from 'leaflet';
import { MAP_CONFIG } from './mapConfig';

interface MapInitializationParams {
  container: HTMLDivElement;
  latitude: number;
  longitude: number;
  name: string;
}

/**
 * Initializes a Leaflet map with tiles and marker
 * Returns the map instance
 */
export function initializeMap({
  container,
  latitude,
  longitude,
  name,
}: MapInitializationParams): L.Map {
  // Initialize map
  const map = L.map(container).setView([latitude, longitude], MAP_CONFIG.DEFAULT_ZOOM);

  // Add OpenStreetMap tiles
  L.tileLayer(MAP_CONFIG.TILE_LAYER_URL, {
    attribution: MAP_CONFIG.ATTRIBUTION,
    maxZoom: MAP_CONFIG.MAX_ZOOM,
  }).addTo(map);

  // Add marker
  L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup(name)
    .openPopup();

  return map;
}

/**
 * Cleans up a map instance
 */
export function cleanupMap(map: L.Map | null): void {
  if (map) {
    map.remove();
  }
}
