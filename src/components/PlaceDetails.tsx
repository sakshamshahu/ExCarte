import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, MapPin, Clock, Phone, Globe } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { amenityGroups } from "../constants/amenties";
import googleIcon from "../../assets/google.svg";
interface PlaceDetailsProps {
  place: any;
  onClose: () => void;
}

const PlaceDetails: React.FC<PlaceDetailsProps> = ({ place, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFullHours, setShowFullHours] = useState(false);
  const [activeMapTab, setActiveMapTab] = useState("location");
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>({ latitude: 12.917789, longitude: 77.634758 });
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log("User Location:", { latitude, longitude });
        setUserLocation({ latitude, longitude });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  React.useEffect(() => {
    getLocation();
  }, []);
  // Price level display
  const getPriceDisplay = () => {
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

  const priceDisplay = getPriceDisplay();

  // Get today's opening hours
  const getTodayHours = () => {
    if (!place.opening_hours || place.opening_hours.length === 0)
      return "Hours not available";

    const today = format(new Date(), "EEEE");
    const todayHours = place.opening_hours.find((hours: string) =>
      hours.toLowerCase().startsWith(today.toLowerCase())
    );

    return todayHours ? todayHours.split(": ")[1] : "Hours not available";
  };

  console.log("Place Details:", place);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 mouse-pointer"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
        // 'esc' to close
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onClose();
          }
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors z-50"
        >
          <X className="h-6 w-6" />
        </button>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <div className="relative">
            <div className="aspect-video relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={place.images[selectedImage]}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
            {place.images.length > 1 && (
              <div className="absolute bottom-4 left-4 flex space-x-2">
                {place.images.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === selectedImage ? "bg-white" : "bg-white/50"
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
                  <h2 className="text-2xl font-bold text-gray-900">
                    {place.name}
                  </h2>
                  {priceDisplay && (
                    <div className="group relative hover:cursor-pointer">
                      <span className="text-sm font-medium text-gray-700/80 ml-1">
                        ({priceDisplay.symbols})
                      </span>
                      <span className="absolute -bottom-6 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        {priceDisplay.label}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center mt-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">
                    {place.average_rating?.toFixed(1) || "N/A"}
                  </span>
                  <span className="mx-1">•</span>
                  <span className="text-gray-600">
                    {place.total_reviews
                      ? `${place.total_reviews.toLocaleString()} reviews`
                      : "No reviews yet"}
                  </span>
                  {/* Google Reviews Badge */}
                  {place.google_total_reviews > 0 && (
                    <div className="ml-2 group relative w-fit hover:cursor-pointer">
                      <div className="bg-gray-100 rounded-full px-2 py-1 flex items-center text-xs gap-1">
                        <img src={googleIcon} className="w-4 h-4" />
                        <span>
                          {place.google_average_rating
                            ? place.google_average_rating.toFixed(1)
                            : "N/A"}
                        </span>
                      </div>
                      <span className="absolute -bottom-6 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {place.google_total_reviews.toLocaleString()} Google
                        Reviews
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-1">
                  <span className="text-sm text-gray-600">
                    {place.tags &&
                      place.tags
                        .map((tag: string) =>
                          tag
                            .split("_")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")
                        )
                        .join(", ")}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4 sm:mt-0 w-full md:max-w-[12rem]">
                <a
                  onClick={() => {
                    onClose();
                    navigate(`/place/${place.id}`);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-center"
                >
                  View Details
                </a>
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
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <span className="ml-2">{place.address}</span>
              </div>

              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 flex-shrink-0" />
                <div className="ml-2">
                  <div className="flex items-center">
                    <span>Today: {getTodayHours()}</span>
                    {place.opening_hours && place.opening_hours.length > 0 && (
                      <button
                        onClick={() => setShowFullHours(!showFullHours)}
                        className="ml-2 text-indigo-600 hover:text-indigo-800 text-sm"
                      >
                        {showFullHours ? "Hide hours" : "Show all hours"}
                      </button>
                    )}
                  </div>

                  {showFullHours && place.opening_hours && (
                    <div className="mt-2 text-sm space-y-1 bg-gray-50 p-2 rounded">
                      {place.opening_hours.map(
                        (hours: string, index: number) => (
                          <div key={index} className="flex">
                            <span className="font-medium w-24">
                              {hours.split(": ")[0]}:
                            </span>
                            <span>{hours.split(": ")[1]}</span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>

              {place.internationalPhoneNumber && (
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  <a
                    href={`tel:${place.internationalPhoneNumber.replace(
                      /\s/g,
                      ""
                    )}`}
                    className="ml-2 hover:text-indigo-600"
                  >
                    {place.nationalPhoneNumber ||
                      place.internationalPhoneNumber}
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
                    onClick={() => setActiveMapTab("location")}
                    className={`py-2 px-4 text-sm font-medium ${
                      activeMapTab === "location"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Location
                  </button>
                  {userLocation && (
                    <button
                      onClick={() => setActiveMapTab("directions")}
                      className={`py-2 px-4 text-sm font-medium ${
                        activeMapTab === "directions"
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      Directions
                    </button>
                  )}
                </div>

                <div className="rounded-lg overflow-hidden h-64 mt-3">
                  {activeMapTab === "location" && (
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${place.latitude},${place.longitude}`}
                    ></iframe>
                  )}

                  {activeMapTab === "directions" && userLocation && (
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Features & Amenities
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(amenityGroups).map(([groupName, amenities]) => {
                  const availableAmenities = amenities.filter(
                    (item) => place[item.key] === true
                  );

                  if (availableAmenities.length === 0) return null;

                  return (
                    <div key={groupName} className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-700 capitalize mb-2">
                        {groupName}
                      </h4>
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

            {/* Reviews Section */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Reviews</h3>
                <button
                  onClick={() => {
                    onClose();
                    navigate(`/place/${place.id}#reviews`);
                  }}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  See all reviews
                </button>
              </div>
              <div className="mt-4 space-y-4">
                {place.reviews && place.reviews.length > 0 ? (
                  place.reviews.slice(0, 2).map((review: any) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 pb-4"
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {review.user?.first_name?.[0] || "U"}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">
                            {review.user?.first_name} {review.user?.last_name}
                          </p>
                          <div className="flex items-center mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-600">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 border border-gray-200 rounded-lg">
                    <p className="text-gray-500">No reviews yet.</p>
                    <button
                      onClick={() => {
                        onClose();
                        navigate(`/place/${place.id}#reviews`);
                      }}
                      className="mt-2 inline-block text-indigo-600 hover:text-indigo-800"
                    >
                      Be the first to review!
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Google Links */}
            {(place.placeUri || place.photosUri || place.reviewsUri) && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Google Resources
                </h4>
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
      </motion.div>
    </AnimatePresence>
  );
};

export default PlaceDetails;
