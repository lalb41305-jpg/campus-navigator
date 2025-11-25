import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Edit, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building } from '@/types/location';
import { mockBuildings } from '@/data/mockBuildings';

const AdminPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [buildings, setBuildings] = useState<Building[]>(mockBuildings);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    latitude: '',
    longitude: '',
    roomName: '',
    category: 'academic' as Building['category'],
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo login - in production use proper authentication
    if (password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Incorrect password. Try: admin123');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBuilding: Building = {
      id: editingId || Date.now().toString(),
      name: formData.name,
      description: formData.description || undefined,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      roomName: formData.roomName || undefined,
      category: formData.category,
    };

    if (editingId) {
      setBuildings(buildings.map(b => b.id === editingId ? newBuilding : b));
    } else {
      setBuildings([...buildings, newBuilding]);
    }

    resetForm();
  };

  const handleEdit = (building: Building) => {
    setFormData({
      name: building.name,
      description: building.description || '',
      latitude: building.latitude.toString(),
      longitude: building.longitude.toString(),
      roomName: building.roomName || '',
      category: building.category || 'academic',
    });
    setEditingId(building.id);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this location?')) {
      setBuildings(buildings.filter(b => b.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      latitude: '',
      longitude: '',
      roomName: '',
      category: 'academic',
    });
    setEditingId(null);
    setIsEditing(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="glass rounded-2xl p-8 space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Admin Login</h1>
              <p className="text-muted-foreground">Enter password to access admin panel</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="mt-1.5"
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-primary">
                Login
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full glass-dark"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Map
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 glass-dark border-b border-border/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsLoggedIn(false)}
              className="glass-dark"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-foreground">
              {editingId ? 'Edit Location' : 'Add New Location'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Building Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="roomName">Room Name (Optional)</Label>
                <Input
                  id="roomName"
                  value={formData.roomName}
                  onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="latitude">Latitude *</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                    required
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="longitude">Longitude *</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                    required
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Building['category'] })}
                  className="w-full mt-1.5 px-3 py-2 bg-background border border-input rounded-lg text-foreground"
                >
                  <option value="academic">Academic</option>
                  <option value="administrative">Administrative</option>
                  <option value="facility">Facility</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="submit" className="flex-1 bg-gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  {editingId ? 'Update' : 'Add'} Location
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" onClick={resetForm} className="glass-dark">
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Table Section */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-foreground">
              Locations ({buildings.length})
            </h2>

            <div className="space-y-2 max-h-[600px] overflow-y-auto no-scrollbar">
              {buildings.map((building) => (
                <div
                  key={building.id}
                  className="glass-dark rounded-xl p-4 flex items-start justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{building.name}</h3>
                    {building.roomName && (
                      <p className="text-sm text-muted-foreground">{building.roomName}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {building.latitude.toFixed(4)}, {building.longitude.toFixed(4)}
                    </p>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(building)}
                      className="h-8 w-8"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(building.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
