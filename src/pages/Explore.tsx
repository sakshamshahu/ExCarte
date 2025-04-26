import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { api } from '../lib/api';
import Map from '../components/Map';
import PlaceCard from '../components/PlaceCard';
import PlaceDetails from '../components/PlaceDetails';
import { MapPin, Coffee, Music, Utensils, ShoppingBag, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Spinner from '../components/Spinner';
import { debounce } from 'lodash';
import { Place } from '../types';

const categories = [
  { id: 'all', name: 'All Places', icon: MapPin },
  { id: 'coffee', name: 'Cafes', icon: Coffee },
  { id: 'nightlife', name: 'Nightlife', icon: Music },
  { id: 'dining', name: 'Restaurants', icon: Utensils },
  { id: 'shopping', name: 'Shopping', icon: ShoppingBag },
];

const PAGE_SIZE = 30; // Default page size

const Explore = () => {
  const { places, setPlaces, selectedPlace, setSelectedPlace } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedFetchPlaces = useCallback(
    debounce(async (query, category, page) => {
      setIsLoading(true);
      try {
        const params : Record<string, string> = {
          page: String(page),
          pageSize: String(PAGE_SIZE),
        };
        if (category !== 'all') params.category = category;
        if (query) params.search = query;

        const data = await api.places.getAll(params);
        console.log('Fetched places:', data);
        setPlaces(data.places || []);
        
        // Update pagination information
        if (data.pagination) {
          setTotalPages(data.pagination.totalPages);
          // In case the API returns a different current page than requested
          setCurrentPage(data.pagination.currentPage);
        }
      } catch (error) {
        console.error('Error fetching places:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [setPlaces]
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  // Fetch places when pagination, search or category changes
  useEffect(() => {
    debouncedFetchPlaces(searchQuery, activeCategory, currentPage);
    return () => debouncedFetchPlaces.cancel();
  }, [searchQuery, activeCategory, currentPage, debouncedFetchPlaces]);

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setShowDetails(true);
  };

  const handlePageChange = (newPage : number) => {
    // Prevent going below page 1 or above total pages
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
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

        {/* Pagination Controls */}
        {places.length > 0 && (
          <div className="flex justify-center items-center mt-24">
            <div className="flex items-center space-x-4 sticky bottom-0 bg-white p-4 rounded-lg shadow-md t-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center justify-center p-2 rounded-lg ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-1">
                {/* Show page numbers */}
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  
                  // Always show first, last, current, and pages around current
                  const showPage = 
                    pageNumber === 1 || 
                    pageNumber === totalPages || 
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);
                  
                  // Show ellipsis
                  if (!showPage) {
                    // Show ellipsis only once for each gap
                    if (pageNumber === 2 || pageNumber === totalPages - 1) {
                      return <span key={pageNumber} className="px-2">...</span>;
                    }
                    return null;
                  }
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-8 h-8 flex items-center justify-center rounded-md ${
                        currentPage === pageNumber
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center p-2 rounded-lg ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
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