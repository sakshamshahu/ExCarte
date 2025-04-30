import React from "react";
import { motion } from "framer-motion";
import { Star, Clock, MapPin, Coffee, CreditCard } from "lucide-react";

export interface MapHoverCardProps {
  place: {
    id: string;
    name: string;
    description: string;
    images?: string[];
    google_average_rating?: number;
    average_rating?: number;
    google_total_reviews?: number;
    total_reviews?: number;
    address?: string;
    opening_hours?: string[];
    category?: string;
    tags?: string[];
    serves_coffee?: boolean;
    acceptsCreditCards?: boolean;
    priceLevel?: string;
  };
  style?: React.CSSProperties;
}

const MapHoverCard: React.FC<MapHoverCardProps> = ({ place, style }) => {
  // Format rating for display - use google rating if available, otherwise use local rating
  const rating = place.google_average_rating || place.average_rating || 0;
  const reviewCount = place.google_total_reviews || place.total_reviews || 0;

  // Get current day for highlighting today's hours
  const getTodayHours = () => {
    if (!place.opening_hours || place.opening_hours.length === 0)
      return "Hours not available";

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = weekdays[new Date().getDay()];
    
    const todayHours = place.opening_hours.find((hours) =>
      hours.toLowerCase().startsWith(today.toLowerCase())
    );

    return todayHours ? todayHours.split(": ")[1] : "Hours not available";
  };

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

  // Get first 2 relevant tags
  const displayTags =
    place.tags
      ?.filter(
        (tag) =>
          !["point_of_interest", "establishment", "food", "store"].includes(tag)
      )
      .slice(0, 2) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden w-64"
      aria-label="Place Card"
      style={{
        ...style,
        transformOrigin: "center bottom",
      }}
    >
      {/* Header with image or category color */}
      <div className="relative h-24 w-full overflow-hidden mouse-pointer">
        {place.images && place.images.length > 0 ? (
          <img
            src={place.images[0]}
            alt={place.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            {place.category && (
              <span className="text-white font-semibold">{place.category}</span>
            )}
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Name and price badge */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-bold line-clamp-1 text-lg">
              {place.name}
            </h3>
            {place.priceLevel && getPriceIndicator(place.priceLevel) && (
              <span className="bg-white/90 px-2 py-0.5 rounded-full text-xs font-medium">
                {getPriceIndicator(place.priceLevel)}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Content section */}
      <div className="p-3 mouse-pointer">
        {/* Rating and review count */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-xs text-gray-500">{reviewCount} reviews</span>
          
          {/* Tags */}
          {displayTags.length > 0 && (
            <>
              <span className="mx-1 text-gray-400">•</span>
              <div className="flex flex-wrap gap-1">
                {displayTags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 text-xs px-1.5 py-0.5 rounded-full"
                  >
                    {tag.replace(/_/g, " ")}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2 mb-2 mouse-pointer">
          {place.description}
        </p>
        
        {/* Additional info section */}
        <div className="border-t border-gray-100 pt-2 space-y-1">
          {/* Address */}
          {place.address && (
            <div className="flex items-start gap-1.5">
              <MapPin className="h-3 w-3 mt-0.5 text-gray-500 flex-shrink-0" />
              <span className="text-xs text-gray-500 line-clamp-1">
                {place.address}
              </span>
            </div>
          )}
          
          {/* Hours */}
          {place.opening_hours && place.opening_hours.length > 0 && (
            <div className="flex items-start gap-1.5">
              <Clock className="h-3 w-3 mt-0.5 text-gray-500 flex-shrink-0" />
              <span className="text-xs text-gray-500">
                Today: {getTodayHours()}
              </span>
            </div>
          )}
          
          {/* Amenities */}
          <div className="flex items-center gap-2 mt-1">
            {place.serves_coffee && (
              <div className="text-gray-500" title="Serves Coffee">
                <Coffee className="h-3 w-3" />
              </div>
            )}
            {place.acceptsCreditCards && (
              <div className="text-gray-500" title="Accepts Cards">
                <CreditCard className="h-3 w-3" />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MapHoverCard;