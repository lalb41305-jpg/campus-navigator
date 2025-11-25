import { Link } from "react-router-dom";
import { Truck, Package, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 animate-float">
            <Truck className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 bg-gradient-primary bg-clip-text text-transparent">
            TruckBook
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Fast, Reliable, and Affordable Truck Parcel Booking Service
          </p>
          <p className="text-lg text-muted-foreground mb-8">
            Book your parcel delivery at <span className="font-bold text-primary">₹110 per km</span>
          </p>
          <Link to="/booking">
            <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
              Book Now <Package className="ml-2" />
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="glass p-8 rounded-2xl text-center transition-smooth hover:scale-105">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
            <p className="text-muted-foreground">Your parcels are in safe hands with our verified drivers</p>
          </div>

          <div className="glass p-8 rounded-2xl text-center transition-smooth hover:scale-105">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">On-Time Delivery</h3>
            <p className="text-muted-foreground">Track your parcel in real-time and get timely updates</p>
          </div>

          <div className="glass p-8 rounded-2xl text-center transition-smooth hover:scale-105">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Truck className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multiple Vehicles</h3>
            <p className="text-muted-foreground">Choose from mini, medium, or large trucks for your needs</p>
          </div>
        </div>

        {/* Admin Link */}
        <div className="text-center mt-16">
          <Link to="/admin" className="text-muted-foreground hover:text-primary transition-colors text-sm">
            Admin Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
