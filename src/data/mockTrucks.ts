import { Truck, Booking } from "@/types/truck";

export const mockTrucks: Truck[] = [
  {
    id: 1,
    truckNumber: "MP09 TR 5521",
    driverName: "Rakesh Singh",
    vehicleType: "Mini Truck",
    status: "Available"
  },
  {
    id: 2,
    truckNumber: "UP78 AS 9923",
    driverName: "Vijay Kumar",
    vehicleType: "Medium Truck",
    status: "Available"
  },
  {
    id: 3,
    truckNumber: "DL12 LM 4432",
    driverName: "Amit Sharma",
    vehicleType: "Large Truck",
    status: "Available"
  },
  {
    id: 4,
    truckNumber: "MH02 BK 7765",
    driverName: "Suresh Patel",
    vehicleType: "Mini Truck",
    status: "Booked"
  }
];

export const mockBookings: Booking[] = [
  {
    bookingId: "BK1023",
    senderName: "Rahul Verma",
    senderPhone: "9876543210",
    pickup: "Indore",
    drop: "Bhopal",
    distance: 200,
    weight: 50,
    description: "Electronics",
    rate: 110,
    totalPrice: 22000,
    assignedTruck: "MP09 TR 5521",
    driverName: "Rakesh Singh",
    status: "In Transit",
    createdAt: new Date().toISOString()
  }
];

export const RATE_PER_KM = 110;
