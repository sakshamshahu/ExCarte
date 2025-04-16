import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { api } from '../lib/api';
import Map from '../components/Map';
import PlaceCard from '../components/PlaceCard';
import PlaceDetails from '../components/PlaceDetails';
import { MapPin, Coffee, Music, Utensils, ShoppingBag, Search } from 'lucide-react';
import Spinner from '../components/Spinner';
import { debounce } from 'lodash';

const categories = [
  { id: 'all', name: 'All Places', icon: MapPin },
  { id: 'coffee', name: 'Cafes', icon: Coffee },
  { id: 'nightlife', name: 'Nightlife', icon: Music },
  { id: 'dining', name: 'Restaurants', icon: Utensils },
  { id: 'shopping', name: 'Shopping', icon: ShoppingBag },
];

const Explore = () => {
  const { places, setPlaces, selectedPlace, setSelectedPlace } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const debouncedFetchPlaces = useCallback(
    debounce(async (query: any, category: any) => {
      setIsLoading(true);
      try {
        const params: Record<string, string> = {};
        if (category !== 'all') params.category = category;
        if (query) params.search = query;

        const data = await api.places.getAll(params);
        console.log('Fetched places:', data);
        setPlaces(data || []);
      } catch (error) {
        console.error('Error fetching places:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [setPlaces]
  );

  useEffect(() => {
    debouncedFetchPlaces(searchQuery, activeCategory);
    return () => debouncedFetchPlaces.cancel();
  }, [searchQuery, activeCategory, debouncedFetchPlaces]);

  const handlePlaceSelect = (place: any) => {
    setSelectedPlace(place);
    setShowDetails(true);
  };

  const memoizedMap = useMemo(
    () => (
      <Map
        places={places}
        onPlaceSelect={(placeId) => {
          const place = places.find((p) => p.id === placeId);
          if (place) handlePlaceSelect(place);
        }}
      />
    ),
    [places]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Map Section */}
        <div className="mb-8">{memoizedMap}</div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search places..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    activeCategory === category.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <category.icon className="h-5 w-5 mr-2" />
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Places Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner size="lg" className="text-indigo-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {places.length > 0 ? (
                places.map((place) => (
                  <motion.div
                    key={place.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <PlaceCard
                      place={{
                        id: place.id,
                        name: place.name,
                        description: place.description,
                        images: place.images,
                        average_rating: place.average_rating,
                        total_reviews: place.total_reviews,
                        address: place.address,
                      }}
                      onClick={() => handlePlaceSelect(place)}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-500 text-lg">No places found matching your criteria.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Place Details Modal */}
        {showDetails && selectedPlace && (
          <PlaceDetails
            place={selectedPlace}
            onClose={() => {
              setShowDetails(false);
              setSelectedPlace(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Explore;