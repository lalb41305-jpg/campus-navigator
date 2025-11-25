import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockTrucks, mockBookings } from "@/data/mockTrucks";
import { Truck, Booking } from "@/types/truck";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [trucks, setTrucks] = useState<Truck[]>(mockTrucks);
  const [bookings] = useState<Booking[]>(mockBookings);
  const [newTruck, setNewTruck] = useState<Partial<Truck>>({
    truckNumber: "",
    driverName: "",
    vehicleType: "Mini Truck",
    status: "Available"
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: "Welcome to Admin Dashboard"
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Incorrect password",
        variant: "destructive"
      });
    }
  };

  const handleAddTruck = () => {
    if (!newTruck.truckNumber || !newTruck.driverName) {
      toast({
        title: "Error",
        description: "Please fill all truck details",
        variant: "destructive"
      });
      return;
    }

    const truck: Truck = {
      id: trucks.length + 1,
      truckNumber: newTruck.truckNumber!,
      driverName: newTruck.driverName!,
      vehicleType: newTruck.vehicleType!,
      status: newTruck.status as "Available" | "Booked"
    };

    setTrucks([...trucks, truck]);
    setNewTruck({
      truckNumber: "",
      driverName: "",
      vehicleType: "Mini Truck",
      status: "Available"
    });

    toast({
      title: "Truck Added",
      description: "New truck has been added successfully"
    });
  };

  const handleDeleteTruck = (id: number) => {
    setTrucks(trucks.filter(t => t.id !== id));
    toast({
      title: "Truck Deleted",
      description: "Truck has been removed from the system"
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-8">
          <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
              />
              <p className="text-xs text-muted-foreground mt-1">Hint: admin123</p>
            </div>
            <Button type="submit" className="w-full">Login</Button>
            <Button type="button" variant="ghost" onClick={() => navigate("/")} className="w-full">
              Back to Home
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-8 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage trucks and view bookings</p>
          </div>
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2" /> Home
          </Button>
        </div>

        {/* Add Truck Section */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Truck
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="truckNumber">Truck Number</Label>
              <Input
                id="truckNumber"
                value={newTruck.truckNumber}
                onChange={(e) => setNewTruck({ ...newTruck, truckNumber: e.target.value })}
                placeholder="e.g., MP09 TR 5521"
              />
            </div>
            <div>
              <Label htmlFor="driverName">Driver Name</Label>
              <Input
                id="driverName"
                value={newTruck.driverName}
                onChange={(e) => setNewTruck({ ...newTruck, driverName: e.target.value })}
                placeholder="e.g., Rakesh Singh"
              />
            </div>
            <div>
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select
                value={newTruck.vehicleType}
                onValueChange={(value) => setNewTruck({ ...newTruck, vehicleType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mini Truck">Mini Truck</SelectItem>
                  <SelectItem value="Medium Truck">Medium Truck</SelectItem>
                  <SelectItem value="Large Truck">Large Truck</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={newTruck.status}
                onValueChange={(value) => setNewTruck({ ...newTruck, status: value as "Available" | "Booked" })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Booked">Booked</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddTruck} className="w-full">
                <Plus className="mr-2 w-4 h-4" />
                Add
              </Button>
            </div>
          </div>
        </Card>

        {/* Trucks Table */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">All Trucks</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Truck Number</th>
                  <th className="text-left p-3 font-semibold">Driver Name</th>
                  <th className="text-left p-3 font-semibold">Vehicle Type</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trucks.map((truck) => (
                  <tr key={truck.id} className="border-b hover:bg-secondary/20">
                    <td className="p-3 font-mono">{truck.truckNumber}</td>
                    <td className="p-3">{truck.driverName}</td>
                    <td className="p-3">{truck.vehicleType}</td>
                    <td className="p-3">
                      <Badge variant={truck.status === "Available" ? "default" : "secondary"}>
                        {truck.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteTruck(truck.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Bookings Table */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">All Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Booking ID</th>
                  <th className="text-left p-3 font-semibold">Customer</th>
                  <th className="text-left p-3 font-semibold">Route</th>
                  <th className="text-left p-3 font-semibold">Driver</th>
                  <th className="text-left p-3 font-semibold">Truck</th>
                  <th className="text-left p-3 font-semibold">Price</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.bookingId} className="border-b hover:bg-secondary/20">
                    <td className="p-3 font-mono">{booking.bookingId}</td>
                    <td className="p-3">{booking.senderName}</td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div>{booking.pickup}</div>
                        <div className="text-muted-foreground">→ {booking.drop}</div>
                      </div>
                    </td>
                    <td className="p-3">{booking.driverName}</td>
                    <td className="p-3 font-mono text-sm">{booking.assignedTruck}</td>
                    <td className="p-3 font-semibold">₹{booking.totalPrice.toLocaleString()}</td>
                    <td className="p-3">
                      <Badge variant={booking.status === "Delivered" ? "default" : "secondary"}>
                        {booking.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
