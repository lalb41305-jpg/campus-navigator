export interface Truck {
  id: number;
  truckNumber: string;
  driverName: string;
  vehicleType: string;
  status: "Available" | "Booked";
}

export interface Booking {
  bookingId: string;
  senderName: string;
  senderPhone: string;
  pickup: string;
  drop: string;
  distance: number;
  weight: number;
  description: string;
  rate: number;
  totalPrice: number;
  assignedTruck: string;
  driverName: string;
  status: "Pending" | "In Transit" | "Delivered";
  createdAt: string;
}

export interface BookingFormData {
  senderName: string;
  senderPhone: string;
  pickup: string;
  drop: string;
  distance: number;
  weight: number;
  description: string;
}
