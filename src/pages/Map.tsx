import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CampusMap from '@/components/CampusMap';
import SearchBar from '@/components/SearchBar';
import BuildingCard from '@/components/BuildingCard';
import FloatingButton from '@/components/FloatingButton';
import { Building } from '@/types/location';
import { mockBuildings } from '@/data/mockBuildings';
import { Crosshair, RotateCcw, Settings } from 'lucide-react';

const MapPage = () => {
  const navigate = useNavigate();
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleBuildingClick = (building: Building) => {
    setSelectedBuilding(building);
  };

  const handleNavigate = (building: Building) => {
    navigate('/navigate', { state: { building, userLocation } });
  };

  const handleLocateUser = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setUserLocation(location);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to mock location for demo
          setUserLocation([37.8719, -122.2585]);
        }
      );
    } else {
      // Fallback for browsers without geolocation
      setUserLocation([37.8719, -122.2585]);
    }
  };

  const handleResetMap = () => {
    setSelectedBuilding(null);
    setUserLocation(null);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Map Container */}
      <CampusMap
        buildings={mockBuildings}
        onBuildingClick={handleBuildingClick}
        selectedBuilding={selectedBuilding}
        userLocation={userLocation}
      />

      {/* Search Bar Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 z-[1000]">
        <div className="max-w-2xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Building Card Overlay */}
      {selectedBuilding && (
        <div className="absolute bottom-20 left-0 right-0 p-4 z-[1000]">
          <div className="max-w-lg mx-auto">
            <BuildingCard
              building={selectedBuilding}
              onNavigate={handleNavigate}
              onClose={() => setSelectedBuilding(null)}
            />
          </div>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="absolute bottom-6 right-4 z-[1000] flex flex-col gap-3">
        <FloatingButton
          icon={Crosshair}
          onClick={handleLocateUser}
          label="My Location"
        />
        <FloatingButton
          icon={RotateCcw}
          onClick={handleResetMap}
          label="Reset Map"
          variant="secondary"
        />
        <FloatingButton
          icon={Settings}
          onClick={() => navigate('/admin')}
          label="Admin"
          variant="secondary"
        />
      </div>
    </div>
  );
};

export default MapPage;
