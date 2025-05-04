import React from "react";
import { motion } from "framer-motion";
import {
  Star,
  Clock,
  MapPin,
  ExternalLink,
  Coffee,
  CreditCard,
} from "lucide-react";
import { format } from "date-fns";
import googleIcon from "../../assets/google.svg";

export interface PlaceCardProps {
  place: {
    id: string;
    name: string;
    description: string;
    images: string[];
    google_average_rating?: number;
    average_rating?: number;
    google_total_reviews?: number;
    total_reviews?: number;
    address: string;
    opening_hours?: string[];
    category?: string;
    tags?: string[];
    serves_coffee?: boolean;
    acceptsCreditCards?: boolean;
    priceLevel?: string;
  };
  onClick: () => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, onClick }) => {
  // Get current day for highlighting today's hours
  const getTodayHours = () => {
    if (!place.opening_hours || place.opening_hours.length === 0)
      return "Hours not available";

    const today = format(new Date(), "EEEE");
    const todayHours = place.opening_hours.find((hours: string) =>
      hours.toLowerCase().startsWith(today.toLowerCase())
    );

    return todayHours ? todayHours.split(": ")[1] : "Hours not available";
  };

  // Format rating for display - use google rating if available, otherwise use local rating
  const rating = (
    ((place.google_total_reviews || 0) * (place.google_average_rating || 0) +
      (place.total_reviews || 0) * (place.average_rating || 0)) /
    ((place.google_total_reviews || 0) + (place.total_reviews || 0) || 1)
  );
  const reviewCount = place.total_reviews || 0;

  // Format price level for display
  const getPriceIndicator = (priceLevel: string) => {
    switch (priceLevel) {
      case "PRICE_LEVEL_INEXPENSIVE":
        return "₹";
      case "PRICE_LEVEL_MODERATE":
        return "₹₹";
      case "PRICE_LEVEL_EXPENSIVE":
        return "₹₹₹";
      case "PRICE_LEVEL_VERY_EXPENSIVE":
        return "₹₹₹₹";
      default:
        return null;
    }
  };

  // Get first 3 relevant tags
  const displayTags =
    place.tags
      ?.filter(
        (tag) =>
          !["point_of_interest", "establishment", "food", "store"].includes(tag)
      )
      .slice(0, 3) || [];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden flex flex-col h-full"
      onClick={onClick}
    >
      {/* Image section with overlay */}
      <div className="relative h-40 md:h-48 w-full">
        {place.images && place.images.length > 0 ? (
          <img
            src={place.images[0]}
            alt={place.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Coffee className="h-12 w-12 text-gray-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Price indicator badge */}
        {place.priceLevel && getPriceIndicator(place.priceLevel) && (
          <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-sm font-medium">
            {getPriceIndicator(place.priceLevel)}
          </div>
        )}
      </div>

      {/* Content section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title and rating */}
        <div className="mb-2">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
            {place.name}
          </h3>
          <div className="flex items-center mt-1">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="ml-1 text-sm font-medium text-gray-700">
                {rating.toFixed(1)}
              </span>
            </div>
            <span className="mx-1 text-gray-400">•</span>
            <span className="text-sm text-gray-500">{reviewCount} reviews</span>
            <div className="bg-gray-100 rounded-full ml-2 px-2 py-1 flex items-center text-xs gap-1">
              <img src={googleIcon} className="w-4 h-4" />
              <span>
                {place.google_total_reviews
                  ? place.google_total_reviews.toString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {displayTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {displayTags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
              >
                {tag.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {place.description}
        </p>

        {/* Location with icon */}
        <div className="flex items-start gap-2 text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span className="text-xs line-clamp-1">{place.address}</span>
        </div>

        {/* Today's hours */}
        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <Clock className="h-4 w-4 flex-shrink-0" />
          <span className="text-xs font-medium">Today: {getTodayHours()}</span>
        </div>

        {/* Footer with amenities */}
        <div className="flex items-center gap-3 mt-auto pt-2 border-t border-gray-100">
          {place.serves_coffee && (
            <div
              className="flex items-center text-gray-500"
              title="Serves Coffee"
            >
              <Coffee className="h-4 w-4" />
            </div>
          )}
          {place.acceptsCreditCards && (
            <div
              className="flex items-center text-gray-500"
              title="Accepts Cards"
            >
              <CreditCard className="h-4 w-4" />
            </div>
          )}
          <div className="ml-auto">
            <ExternalLink className="h-4 w-4 text-blue-500" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceCard;
