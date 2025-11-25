import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Building } from '@/types/location';

// Fix for default markers in Leaflet with Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface CampusMapProps {
  buildings: Building[];
  onBuildingClick: (building: Building) => void;
  selectedBuilding?: Building | null;
  userLocation?: [number, number] | null;
  routeCoordinates?: [number, number][];
  center?: [number, number];
  zoom?: number;
}

const CampusMap = ({
  buildings,
  onBuildingClick,
  selectedBuilding,
  userLocation,
  routeCoordinates,
  center = [37.8719, -122.2585], // Default to UC Berkeley coordinates
  zoom = 16,
}: CampusMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const routeLineRef = useRef<L.Polyline | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    const map = L.map(mapContainer.current).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapInstance.current = map;

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Update building markers
  useEffect(() => {
    if (!mapInstance.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    buildings.forEach((building) => {
      const isSelected = selectedBuilding?.id === building.id;
      
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="relative">
            <div class="w-8 h-8 rounded-full ${
              isSelected ? 'bg-primary animate-pulse-glow' : 'bg-accent'
            } flex items-center justify-center shadow-lg border-2 border-white">
              <div class="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([building.latitude, building.longitude], {
        icon: customIcon,
      })
        .addTo(mapInstance.current!)
        .on('click', () => onBuildingClick(building));

      markersRef.current.push(marker);
    });
  }, [buildings, selectedBuilding, onBuildingClick]);

  // Update user location marker
  useEffect(() => {
    if (!mapInstance.current) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }

    if (userLocation) {
      const userIcon = L.divIcon({
        className: 'user-marker',
        html: `
          <div class="relative">
            <div class="w-4 h-4 rounded-full bg-primary border-4 border-white shadow-lg animate-pulse-glow"></div>
            <div class="absolute inset-0 w-4 h-4 rounded-full bg-primary/30 animate-ping"></div>
          </div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      userMarkerRef.current = L.marker(userLocation, { icon: userIcon }).addTo(
        mapInstance.current
      );
    }
  }, [userLocation]);

  // Update route line
  useEffect(() => {
    if (!mapInstance.current) return;

    if (routeLineRef.current) {
      routeLineRef.current.remove();
      routeLineRef.current = null;
    }

    if (routeCoordinates && routeCoordinates.length > 1) {
      routeLineRef.current = L.polyline(routeCoordinates, {
        color: '#6366f1',
        weight: 4,
        opacity: 0.8,
        dashArray: '10, 10',
        className: 'route-line',
      }).addTo(mapInstance.current);

      // Fit bounds to show entire route
      mapInstance.current.fitBounds(routeLineRef.current.getBounds(), {
        padding: [50, 50],
      });
    }
  }, [routeCoordinates]);

  // Update center when selectedBuilding changes
  useEffect(() => {
    if (mapInstance.current && selectedBuilding) {
      mapInstance.current.setView(
        [selectedBuilding.latitude, selectedBuilding.longitude],
        17,
        { animate: true, duration: 1 }
      );
    }
  }, [selectedBuilding]);

  return (
    <div ref={mapContainer} className="w-full h-full rounded-none md:rounded-2xl overflow-hidden shadow-glass" />
  );
};

export default CampusMap;
