export interface Building {
  id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  roomName?: string;
  category?: 'academic' | 'administrative' | 'facility' | 'other';
}

export interface RouteData {
  distance: number; // in meters
  duration: number; // in minutes
  coordinates: [number, number][];
}
