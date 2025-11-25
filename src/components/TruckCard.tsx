import { Truck } from "@/types/truck";
import { Button } from "@/components/ui/button";
import { Truck as TruckIcon, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TruckCardProps {
  truck: Truck;
  onSelect: (truck: Truck) => void;
}

const TruckCard = ({ truck, onSelect }: TruckCardProps) => {
  return (
    <div className="glass p-6 rounded-xl transition-smooth hover:scale-105">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <TruckIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{truck.truckNumber}</h3>
            <p className="text-sm text-muted-foreground">{truck.vehicleType}</p>
          </div>
        </div>
        <Badge variant={truck.status === "Available" ? "default" : "secondary"}>
          {truck.status}
        </Badge>
      </div>

      <div className="flex items-center gap-2 text-muted-foreground mb-4">
        <User className="w-4 h-4" />
        <span className="text-sm">{truck.driverName}</span>
      </div>

      <Button
        onClick={() => onSelect(truck)}
        disabled={truck.status === "Booked"}
        className="w-full"
      >
        {truck.status === "Available" ? "Select Truck" : "Not Available"}
      </Button>
    </div>
  );
};

export default TruckCard;
