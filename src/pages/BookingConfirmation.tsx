import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, MapPin, Package, Truck as TruckIcon, User, Clock, IndianRupee } from "lucide-react";
import { BookingFormData, Truck } from "@/types/truck";
import { RATE_PER_KM } from "@/data/mockTrucks";
import { useToast } from "@/hooks/use-toast";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const [bookingId] = useState(`BK${Math.floor(1000 + Math.random() * 9000)}`);

  useEffect(() => {
    const bookingDataStr = sessionStorage.getItem("bookingData");
    const truckDataStr = sessionStorage.getItem("selectedTruck");

    if (!bookingDataStr || !truckDataStr) {
      toast({
        title: "Invalid booking",
        description: "Please complete the booking process from the beginning",
        variant: "destructive"
      });
      navigate("/booking");
      return;
    }

    setBookingData(JSON.parse(bookingDataStr));
    setSelectedTruck(JSON.parse(truckDataStr));
  }, [navigate, toast]);

  const handleDownloadReceipt = () => {
    toast({
      title: "Receipt Downloaded",
      description: "Your booking receipt has been downloaded successfully"
    });
  };

  const handleTrackParcel = () => {
    toast({
      title: "Track Parcel",
      description: "Parcel tracking feature will be available soon"
    });
  };

  const handleNewBooking = () => {
    sessionStorage.clear();
    navigate("/booking");
  };

  if (!bookingData || !selectedTruck) return null;

  const totalPrice = bookingData.distance * RATE_PER_KM;
  const estimatedHours = Math.ceil(bookingData.distance / 60);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-8 px-4">
      <div className="container max-w-3xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2" /> Back to Home
        </Button>

        {/* Success Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4 animate-pulse-glow">
            <Package className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">Your parcel booking has been successfully created</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-sm text-muted-foreground">Booking ID:</span>
            <span className="font-bold text-primary">{bookingId}</span>
          </div>
        </div>

        {/* Booking Details */}
        <div className="glass p-8 rounded-2xl space-y-6 mb-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
          </div>

          {/* Route */}
          <div className="flex items-center gap-4 p-4 bg-secondary/20 rounded-xl">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold">{bookingData.pickup}</p>
              <div className="flex items-center gap-2 my-2">
                <div className="h-px flex-1 bg-border"></div>
                <span className="text-xs text-muted-foreground">{bookingData.distance} km</span>
                <div className="h-px flex-1 bg-border"></div>
              </div>
              <p className="font-semibold">{bookingData.drop}</p>
            </div>
          </div>

          {/* Parcel Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-secondary/20 rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">Sender Name</p>
              <p className="font-semibold">{bookingData.senderName}</p>
            </div>
            <div className="p-4 bg-secondary/20 rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
              <p className="font-semibold">{bookingData.senderPhone}</p>
            </div>
            <div className="p-4 bg-secondary/20 rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">Parcel Weight</p>
              <p className="font-semibold">{bookingData.weight} kg</p>
            </div>
            <div className="p-4 bg-secondary/20 rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">Description</p>
              <p className="font-semibold">{bookingData.description}</p>
            </div>
          </div>

          {/* Truck & Driver Info */}
          <div className="border-t border-border pt-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <TruckIcon className="w-5 h-5 text-primary" />
              Assigned Vehicle
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">Truck Number</p>
                <p className="font-bold text-primary text-lg">{selectedTruck.truckNumber}</p>
                <p className="text-sm text-muted-foreground mt-2">{selectedTruck.vehicleType}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Driver Name
                </p>
                <p className="font-bold text-lg">{selectedTruck.driverName}</p>
              </div>
            </div>
          </div>

          {/* Price & Time */}
          <div className="border-t border-border pt-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-secondary/20 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                  <IndianRupee className="w-4 h-4" />
                  Total Fare
                </p>
                <p className="text-3xl font-bold text-primary">₹{totalPrice.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">@₹{RATE_PER_KM}/km</p>
              </div>
              <div className="p-4 bg-secondary/20 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Estimated Delivery
                </p>
                <p className="text-3xl font-bold">{estimatedHours}h</p>
                <p className="text-xs text-muted-foreground mt-1">Approximate time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-4">
          <Button onClick={handleDownloadReceipt} variant="outline" className="w-full">
            <Download className="mr-2 w-4 h-4" />
            Download Receipt
          </Button>
          <Button onClick={handleTrackParcel} variant="outline" className="w-full">
            <MapPin className="mr-2 w-4 h-4" />
            Track Parcel
          </Button>
          <Button onClick={handleNewBooking} className="w-full">
            New Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
