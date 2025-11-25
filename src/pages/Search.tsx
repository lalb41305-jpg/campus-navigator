import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import { Building } from '@/types/location';
import { mockBuildings } from '@/data/mockBuildings';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Building[]>([]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = mockBuildings.filter(
        (building) =>
          building.name.toLowerCase().includes(query.toLowerCase()) ||
          building.description?.toLowerCase().includes(query.toLowerCase()) ||
          building.roomName?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults(mockBuildings);
    }
  }, [query]);

  const handleBuildingClick = (building: Building) => {
    navigate('/', { state: { selectedBuilding: building } });
  };

  const categoryColors = {
    academic: 'bg-primary/10 text-primary border-primary/20',
    administrative: 'bg-accent/10 text-accent border-accent/20',
    facility: 'bg-secondary text-secondary-foreground border-secondary',
    other: 'bg-muted text-muted-foreground border-border',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 glass-dark border-b border-border/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <SearchBar onSearch={setQuery} placeholder="Search buildings, rooms..." />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4">
          <h2 className="text-sm font-medium text-muted-foreground">
            {results.length} {results.length === 1 ? 'result' : 'results'} found
          </h2>
        </div>

        <div className="space-y-3">
          {results.map((building) => (
            <button
              key={building.id}
              onClick={() => handleBuildingClick(building)}
              className="w-full text-left glass rounded-xl p-4 hover:shadow-glass transition-smooth group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth">
                      {building.name}
                    </h3>
                  </div>
                  {building.roomName && (
                    <p className="text-sm text-muted-foreground mb-1 ml-6">
                      {building.roomName}
                    </p>
                  )}
                  {building.description && (
                    <p className="text-sm text-muted-foreground ml-6 line-clamp-2">
                      {building.description}
                    </p>
                  )}
                </div>
                {building.category && (
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${
                      categoryColors[building.category]
                    }`}
                  >
                    {building.category}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <MapPin className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try searching for a different building or room
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
