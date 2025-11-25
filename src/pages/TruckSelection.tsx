import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { mockTrucks } from "@/data/mockTrucks";
import { Truck, BookingFormData } from "@/types/truck";
import TruckCard from "@/components/TruckCard";
import { useToast } from "@/hooks/use-toast";

const TruckSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [trucks] = useState<Truck[]>(mockTrucks);
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("bookingData");
    if (!data) {
      toast({
        title: "No booking data found",
        description: "Please fill the booking form first",
        variant: "destructive"
      });
      navigate("/booking");
      return;
    }
    setBookingData(JSON.parse(data));
  }, [navigate, toast]);

  const handleTruckSelect = (truck: Truck) => {
    if (truck.status === "Booked") {
      toast({
        title: "Truck not available",
        description: "This truck is already booked. Please select another truck.",
        variant: "destructive"
      });
      return;
    }

    sessionStorage.setItem("selectedTruck", JSON.stringify(truck));
    navigate("/confirmation");
  };

  if (!bookingData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-8 px-4">
      <div className="container max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/booking")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2" /> Back to Form
        </Button>

        <div className="glass p-8 rounded-2xl mb-8">
          <h1 className="text-3xl font-bold mb-2">Select Your Truck</h1>
          <p className="text-muted-foreground">
            Choose an available truck for your parcel delivery from <strong>{bookingData.pickup}</strong> to <strong>{bookingData.drop}</strong>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trucks.map((truck) => (
            <TruckCard
              key={truck.id}
              truck={truck}
              onSelect={handleTruckSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TruckSelection;
