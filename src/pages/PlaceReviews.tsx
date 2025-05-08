import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useStore } from "../store";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import ReviewItem from "../components/ReviewItem";
import ReviewForm from "../components/ReviewForm";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, MapPin, Clock, ArrowLeft, Phone, Globe
} from 'lucide-react';
import { format } from 'date-fns';
import { amenityGroups } from "../constants/amenties";
import googleIcon from "../../assets/google.svg";
const PlaceReviews = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFullHours, setShowFullHours] = useState(false);
  const [activeMapTab, setActiveMapTab] = useState('location');
  const [place, setPlace] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userReview, setUserReview] = useState<any>(null);
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>({ latitude: 12.917789, longitude: 77.634758 });
  
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      }, (error) => {
        console.error('Geolocation error:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  
  useEffect(() => {
    getLocation();
  }, []);

  // Move getPriceDisplay inside the component logic where place is guaranteed to exist
  const getPriceDisplay = () => {
    if (!place || !place.priceLevel) return null;
    
    switch (place.priceLevel) {
      case "PRICE_LEVEL_INEXPENSIVE":
        return { symbols: "₹", label: "Inexpensive" };
      case "PRICE_LEVEL_MODERATE":
        return { symbols: "₹₹", label: "Moderate" };
      case "PRICE_LEVEL_EXPENSIVE":
        return { symbols: "₹₹₹", label: "Expensive" };
      case "PRICE_LEVEL_VERY_EXPENSIVE":
        return { symbols: "₹₹₹₹", label: "Very Expensive" };
      default:
        return null;
    }
  };

  // Get today's opening hours
  const getTodayHours = () => {
    if (!place || !place.opening_hours || place.opening_hours.length === 0) {
      return "Hours not available";
    }
    
    const today = format(new Date(), 'EEEE');
    const todayHours = place.opening_hours.find((hours: string) => 
      hours.toLowerCase().startsWith(today.toLowerCase())
    );
    
    return todayHours ? todayHours.split(': ')[1] : "Hours not available";
  };

  useEffect(() => {
    const fetchPlaceAndReviews = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const placeData = await api.places.getById(id);
        setPlace(placeData);

        const reviewsData = await api.reviews.getForPlace(id);
        setReviews(reviewsData);

        // Check if current user has already reviewed this place
        if (user) {
          const userReviewData = reviewsData.find(
            (review: any) => review.user_id === user.id
          );
          if (userReviewData) {
            setUserReview(userReviewData);
          }
        }
      } catch (error) {
        console.error("Error fetching place and reviews:", error);
        toast.error("Failed to load place information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaceAndReviews();
  }, [id, user]);

  const handleReviewSubmitted = async () => {
    if (!id) return;

    try {
      // Refresh reviews
      const reviewsData = await api.reviews.getForPlace(id);
      setReviews(reviewsData);

      // Update place data to get new average rating
      const placeData = await api.places.getById(id);
      setPlace(placeData);

      // Check if current user has a review now
      if (user) {
        const userReviewData = reviewsData.find(
          (review: any) => review.user_id === user.id
        );
        setUserReview(userReviewData);
      }

      setIsEditingReview(false);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  const handleDeleteReview = async () => {
    if (!userReview) return;

    setIsDeleting(true);
    try {
      if (!id || !user) return;
      await api.reviews.delete(user.id, id);
      toast.success("Review deleted successfully");

      // Refresh data
      setUserReview(null);
      await handleReviewSubmitted();
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review");
    } finally {
      setIsDeleting(false);
    }
  };

  // Only calculate priceDisplay when place exists
  const priceDisplay = place ? getPriceDisplay() : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner size="lg" className="text-indigo-600" />
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Place not found
          </h2>
          <button
            onClick={() => navigate("/explore")}
            className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Explore
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </button>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-fit overflow-y-auto mb-8"
        >
          <div className="relative">
            {place.images && place.images.length > 0 ? (
              <div className="aspect-video relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={place.images[selectedImage]}
                    alt={place.name}
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                </AnimatePresence>
              </div>
            ) : (
              <div className="aspect-video bg-gray-200 flex items-center justify-center rounded-t-xl">
                <span className="text-gray-500">No images available</span>
              </div>
            )}
            {place.images && place.images.length > 1 && (
              <div className="absolute bottom-4 left-4 flex space-x-2">
                {place.images.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === selectedImage ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-start">
                  <h2 className="text-2xl font-bold text-gray-900">{place.name}</h2>
                  {priceDisplay && (
                    <div className="group relative hover:cursor-pointer">
                      <span className="text-sm font-medium text-gray-700/80 ml-1">({priceDisplay.symbols})</span>
                      <span className="absolute -bottom-6 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        {priceDisplay.label}
                      </span>
                    </div>
                  )}
                  {/* Google Reviews Badge */}
                  {place.google_total_reviews > 0 && (
                    <div className="ml-2 group relative hover:cursor-pointer">
                      <div className="bg-gray-100 rounded-full px-2 py-1 flex items-center text-xs gap-1">
                        <img src={googleIcon} className="w-4 h-4"/>
                        <span>{place.google_average_rating ? place.google_average_rating.toFixed(1) : 'N/A'}</span>
                      </div>
                      <span className="absolute -bottom-6 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {place.google_total_reviews.toLocaleString()} Google Reviews
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center mt-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">
                    {place.average_rating ? place.average_rating.toFixed(1) : 'N/A'}
                  </span>
                  <span className="mx-1">•</span>
                  <span className="text-gray-600">
                    {place.total_reviews ? `${place.total_reviews.toLocaleString()} reviews` : 'No reviews yet'}
                  </span>
                </div>
                <div className="mt-1">
                  {place.tags && place.tags.length > 0 && (
                    <span className="text-sm text-gray-600">
                      {place.tags.map((tag: string) => 
                        tag.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                      ).join(', ')}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4 sm:mt-0 w-full md:max-w-[12rem]">
                {place.directionsUri && userLocation && (
                  <a 
                    href={place.directionsUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors text-center"
                  >
                    Get Directions
                  </a>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {place.address && (
                <div className="flex items-start text-gray-600">
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span className="ml-2">{place.address}</span>
                </div>
              )}
              
              {place.opening_hours && place.opening_hours.length > 0 && (
                <div className="flex items-start text-gray-600">
                  <Clock className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div className="ml-2">
                    <div className="flex items-center">
                      <span>Today: {getTodayHours()}</span>
                      <button 
                        onClick={() => setShowFullHours(!showFullHours)}
                        className="ml-2 text-indigo-600 hover:text-indigo-800 text-sm"
                      >
                        {showFullHours ? 'Hide hours' : 'Show all hours'}
                      </button>
                    </div>
                    
                    {showFullHours && (
                      <div className="mt-2 text-sm space-y-1 bg-gray-50 p-2 rounded">
                        {place.opening_hours.map((hours: string, index: number) => (
                          <div key={index} className="flex">
                            <span className="font-medium w-24">{hours.split(': ')[0]}:</span>
                            <span>{hours.split(': ')[1]}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {place.internationalPhoneNumber && (
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  <a 
                    href={`tel:${place.internationalPhoneNumber.replace(/\s/g, '')}`}
                    className="ml-2 hover:text-indigo-600"
                  >
                    {place.nationalPhoneNumber || place.internationalPhoneNumber}
                  </a>
                </div>
              )}
              
              {place.websiteUri && (
                <div className="flex items-center text-gray-600">
                  <Globe className="h-5 w-5 flex-shrink-0" />
                  <a
                    href={place.websiteUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-indigo-600 hover:text-indigo-700"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>

            {/* Google Maps Embed */}
            {place.latitude && place.longitude && (
              <div className="mt-6">
                <div className="flex items-center border-b border-gray-200">
                  <button
                    onClick={() => setActiveMapTab('location')}
                    className={`py-2 px-4 text-sm font-medium ${
                      activeMapTab === 'location'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Location
                  </button>
                  {userLocation && (
                    <button
                      onClick={() => setActiveMapTab('directions')}
                      className={`py-2 px-4 text-sm font-medium ${
                        activeMapTab === 'directions'
                          ? 'text-indigo-600 border-b-2 border-indigo-600'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Directions
                    </button>
                  )}
                </div>
                
                <div className="rounded-lg overflow-hidden h-64 mt-3">
                  {activeMapTab === 'location' && (
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${place.latitude},${place.longitude}`}
                    ></iframe>
                  )}
                  
                  {activeMapTab === 'directions' && userLocation && (
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${userLocation.latitude},${userLocation.longitude}&destination=${place.latitude},${place.longitude}&mode=driving`}
                    ></iframe>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            {place.description && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900">About</h3>
                <p className="mt-2 text-gray-600">{place.description}</p>
              </div>
            )}

            {/* Amenities Section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Features & Amenities</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(amenityGroups).map(([groupName, amenities]) => {
                  // Only show amenity groups that have at least one true value
                  const availableAmenities = amenities.filter(item => place[item.key] === true);
                  
                  if (availableAmenities.length === 0) return null;
                  
                  return (
                    <div key={groupName} className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-700 capitalize mb-2">{groupName}</h4>
                      <div className="flex flex-wrap gap-2">
                        {availableAmenities.map((item) => (
                          <div 
                            key={item.key} 
                            className="bg-white px-2 py-1 rounded flex items-center text-sm border border-gray-200"
                          >
                            {item.icon}
                            <span className="ml-1">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Google Links */}
            {(place.placeUri || place.photosUri || place.reviewsUri) && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Google Resources</h4>
                <div className="flex flex-wrap gap-x-2">
                  {place.placeUri && (
                    <a 
                      href={place.placeUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:text-indigo-600"
                    >
                      View on Google Maps
                    </a>
                  )}
                  {place.placeUri && place.photosUri && (
                    <span className="text-gray-400">•</span>
                  )}
                  {place.photosUri && (
                    <a 
                      href={place.photosUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:text-indigo-600"
                    >
                      More Photos
                    </a>
                  )}
                  {place.photosUri && place.reviewsUri && (
                    <span className="text-gray-400">•</span>
                  )}
                  {place.reviewsUri && (
                    <a 
                      href={place.reviewsUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:text-indigo-600"
                    >
                      Google Reviews
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {user && (
          <div className="mb-8" id="reviews">
            {userReview && !isEditingReview ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Your Review
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsEditingReview(true)}
                      className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDeleteReview}
                      disabled={isDeleting}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
                <ReviewItem review={userReview} />
              </div>
            ) : (
              <ReviewForm
                placeId={id!}
                onReviewSubmitted={handleReviewSubmitted}
                existingReview={isEditingReview ? userReview : undefined}
              />
            )}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            All Reviews ({reviews.length})
          </h2>

          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <ReviewItem
                  key={review.id}
                  review={review}
                  showActions={false}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No reviews yet. Be the first to review this place!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceReviews;
