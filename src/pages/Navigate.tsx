import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CampusMap from '@/components/CampusMap';
import { Building, RouteData } from '@/types/location';
import { ArrowLeft, Navigation, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavigatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { building, userLocation } = location.state as {
    building: Building;
    userLocation: [number, number] | null;
  };

  const [routeData, setRouteData] = useState<RouteData | null>(null);

  useEffect(() => {
    if (building && userLocation) {
      // Calculate mock route data
      const lat1 = userLocation[0];
      const lon1 = userLocation[1];
      const lat2 = building.latitude;
      const lon2 = building.longitude;

      // Simple haversine distance calculation
      const R = 6371e3; // Earth's radius in meters
      const φ1 = (lat1 * Math.PI) / 180;
      const φ2 = (lat2 * Math.PI) / 180;
      const Δφ = ((lat2 - lat1) * Math.PI) / 180;
      const Δλ = ((lon2 - lon1) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      // Assume walking speed of 5 km/h (83.33 m/min)
      const duration = Math.round(distance / 83.33);

      // Create simple route coordinates (straight line for demo)
      const coordinates: [number, number][] = [
        userLocation,
        [building.latitude, building.longitude],
      ];

      setRouteData({
        distance: Math.round(distance),
        duration,
        coordinates,
      });
    }
  }, [building, userLocation]);

  if (!building) {
    return null;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Map with route */}
      <CampusMap
        buildings={[building]}
        onBuildingClick={() => {}}
        selectedBuilding={building}
        userLocation={userLocation}
        routeCoordinates={routeData?.coordinates}
      />

      {/* Header Card */}
      <div className="absolute top-0 left-0 right-0 p-4 z-[1000]">
        <div className="max-w-2xl mx-auto glass rounded-2xl p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="rounded-full flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-foreground truncate">
                Navigating to {building.name}
              </h2>
              {building.roomName && (
                <p className="text-sm text-muted-foreground">{building.roomName}</p>
              )}
            </div>
            <Navigation className="w-5 h-5 text-primary flex-shrink-0 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Route Info Card */}
      {routeData && (
        <div className="absolute bottom-6 left-0 right-0 p-4 z-[1000]">
          <div className="max-w-lg mx-auto glass rounded-2xl p-5 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Distance</p>
                  <p className="text-lg font-semibold text-foreground">
                    {routeData.distance >= 1000
                      ? `${(routeData.distance / 1000).toFixed(2)} km`
                      : `${routeData.distance} m`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Est. Time</p>
                  <p className="text-lg font-semibold text-foreground">
                    {routeData.duration < 1 ? '< 1' : routeData.duration} min
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                <span>Following walking path</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {!userLocation && (
        <div className="absolute bottom-6 left-0 right-0 p-4 z-[1000]">
          <div className="max-w-lg mx-auto glass rounded-2xl p-5 text-center">
            <p className="text-muted-foreground mb-3">
              Enable location services to see route and directions
            </p>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="glass-dark"
            >
              Go Back
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigatePage;
