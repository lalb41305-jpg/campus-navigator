import { Building } from '@/types/location';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BuildingCardProps {
  building: Building;
  onNavigate: (building: Building) => void;
  onClose?: () => void;
}

const BuildingCard = ({ building, onNavigate, onClose }: BuildingCardProps) => {
  const categoryColors = {
    academic: 'bg-primary/10 text-primary',
    administrative: 'bg-accent/10 text-accent',
    facility: 'bg-secondary text-secondary-foreground',
    other: 'bg-muted text-muted-foreground',
  };

  const categoryColor = categoryColors[building.category || 'other'];

  return (
    <div className="glass rounded-2xl p-5 space-y-4 animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-lg text-foreground">{building.name}</h3>
          </div>
          {building.roomName && (
            <p className="text-sm text-muted-foreground mb-1">{building.roomName}</p>
          )}
          {building.description && (
            <p className="text-sm text-muted-foreground">{building.description}</p>
          )}
        </div>
        {building.category && (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
            {building.category}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => onNavigate(building)}
          className="flex-1 bg-gradient-primary hover:opacity-90 transition-smooth"
        >
          <Navigation className="w-4 h-4 mr-2" />
          Navigate
        </Button>
        {onClose && (
          <Button
            onClick={onClose}
            variant="outline"
            className="glass-dark"
          >
            Close
          </Button>
        )}
      </div>
    </div>
  );
};

export default BuildingCard;
