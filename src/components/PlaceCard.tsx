import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';

export interface PlaceCardProps {
  place: {
    id: string;
    name: string;
    description: string;
    images: string[];
    average_rating: number;
    total_reviews: number;
    address: string;
  };
  onClick: () => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="relative h-48">
        <img
          src={place.images[0]}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-semibold text-white">{place.name}</h3>
          <div className="flex items-center mt-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-white">
              {place.average_rating.toFixed(1)}
            </span>
            <span className="mx-1 text-white">•</span>
            <span className="text-sm text-white">{place.total_reviews} reviews</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600 line-clamp-2">{place.description}</p>
        <div className="flex items-center mt-2 text-gray-500">
          <MapPin className="h-4 w-4" />
          <span className="ml-1 text-sm">{place.address}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceCard;