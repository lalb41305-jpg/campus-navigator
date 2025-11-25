import { Building } from '@/types/location';

// Mock data for campus buildings (replace with your actual campus coordinates)
export const mockBuildings: Building[] = [
  {
    id: '1',
    name: 'Main Library',
    description: 'Central campus library with study areas and computer labs',
    latitude: 37.8719,
    longitude: -122.2585,
    category: 'academic',
  },
  {
    id: '2',
    name: 'Engineering Building',
    description: 'Home to Computer Science and Engineering departments',
    latitude: 37.8729,
    longitude: -122.2595,
    roomName: 'Room 101',
    category: 'academic',
  },
  {
    id: '3',
    name: 'Student Center',
    description: 'Student activities, cafeteria, and recreation',
    latitude: 37.8709,
    longitude: -122.2575,
    category: 'facility',
  },
  {
    id: '4',
    name: 'Administration Building',
    description: 'Main administrative offices and registration',
    latitude: 37.8739,
    longitude: -122.2605,
    category: 'administrative',
  },
  {
    id: '5',
    name: 'Science Lab',
    description: 'Physics, Chemistry, and Biology laboratories',
    latitude: 37.8699,
    longitude: -122.2565,
    roomName: 'Lab 201',
    category: 'academic',
  },
  {
    id: '6',
    name: 'Sports Complex',
    description: 'Gymnasium, pool, and sports facilities',
    latitude: 37.8689,
    longitude: -122.2555,
    category: 'facility',
  },
];
