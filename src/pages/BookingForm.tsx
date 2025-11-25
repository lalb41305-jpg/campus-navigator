import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calculator } from "lucide-react";
import { RATE_PER_KM } from "@/data/mockTrucks";
import { BookingFormData } from "@/types/truck";

const BookingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BookingFormData>({
    senderName: "",
    senderPhone: "",
    pickup: "",
    drop: "",
    distance: 0,
    weight: 0,
    description: ""
  });

  const totalPrice = formData.distance * RATE_PER_KM;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data in session storage
    sessionStorage.setItem("bookingData", JSON.stringify(formData));
    navigate("/trucks");
  };

  const handleInputChange = (field: keyof BookingFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-8 px-4">
      <div className="container max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2" /> Back to Home
        </Button>

        <div className="glass p-8 rounded-2xl">
          <h1 className="text-3xl font-bold mb-2">Book Your Parcel</h1>
          <p className="text-muted-foreground mb-8">Fill in the details below to book your parcel delivery</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="senderName">Sender Name *</Label>
                <Input
                  id="senderName"
                  required
                  value={formData.senderName}
                  onChange={(e) => handleInputChange("senderName", e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <Label htmlFor="senderPhone">Sender Phone *</Label>
                <Input
                  id="senderPhone"
                  type="tel"
                  required
                  value={formData.senderPhone}
                  onChange={(e) => handleInputChange("senderPhone", e.target.value)}
                  placeholder="10-digit mobile number"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="pickup">Pickup Address *</Label>
              <Input
                id="pickup"
                required
                value={formData.pickup}
                onChange={(e) => handleInputChange("pickup", e.target.value)}
                placeholder="Enter pickup location"
              />
            </div>

            <div>
              <Label htmlFor="drop">Drop Address *</Label>
              <Input
                id="drop"
                required
                value={formData.drop}
                onChange={(e) => handleInputChange("drop", e.target.value)}
                placeholder="Enter drop location"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="distance">Distance (km) *</Label>
                <Input
                  id="distance"
                  type="number"
                  required
                  min="1"
                  value={formData.distance || ""}
                  onChange={(e) => handleInputChange("distance", Number(e.target.value))}
                  placeholder="Enter distance"
                />
              </div>

              <div>
                <Label htmlFor="weight">Parcel Weight (kg) *</Label>
                <Input
                  id="weight"
                  type="number"
                  required
                  min="1"
                  value={formData.weight || ""}
                  onChange={(e) => handleInputChange("weight", Number(e.target.value))}
                  placeholder="Enter weight"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Parcel Description *</Label>
              <Textarea
                id="description"
                required
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe your parcel (e.g., Electronics, Furniture, Documents)"
                rows={3}
              />
            </div>

            {/* Price Display */}
            <div className="bg-primary/10 border-2 border-primary/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Rate per km
                </span>
                <span className="font-semibold">₹{RATE_PER_KM}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Distance</span>
                <span className="font-semibold">{formData.distance} km</span>
              </div>
              <div className="border-t border-primary/20 pt-4 flex items-center justify-between">
                <span className="text-lg font-bold">Total Price</span>
                <span className="text-2xl font-bold text-primary">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={totalPrice === 0}>
              Proceed to Select Truck
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
