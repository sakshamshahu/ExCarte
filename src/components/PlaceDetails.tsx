import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, MapPin, Clock, Phone, Globe } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface PlaceDetailsProps {
  place: any;
  onClose: () => void;
}

const PlaceDetails: React.FC<PlaceDetailsProps> = ({ place, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
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
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {place.images.length > 1 && (
              <div className="absolute bottom-4 left-4 flex space-x-2">
                {place.images.map((_, index) => (
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
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{place.name}</h2>
                <div className="flex items-center mt-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{place.average_rating.toFixed(1)}</span>
                  <span className="mx-1">•</span>
                  <span className="text-gray-600">{place.total_reviews} reviews</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  onClose();
                  navigate(`/place/${place.id}/reviews`);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                View Reviews
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5" />
                <span className="ml-2">{place.address}</span>
              </div>
              {place.opening_hours && (
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5" />
                  <span className="ml-2">
                    {format(new Date(), 'EEEE')}: {place.opening_hours.today}
                  </span>
                </div>
              )}
              {place.phone && (
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5" />
                  <span className="ml-2">{place.phone}</span>
                </div>
              )}
              {place.website && (
                <div className="flex items-center text-gray-600">
                  <Globe className="h-5 w-5" />
                  <a
                    href={place.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-indigo-600 hover:text-indigo-700"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900">About</h3>
              <p className="mt-2 text-gray-600">{place.description}</p>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Reviews</h3>
                <button
                  onClick={() => {
                    onClose();
                    navigate(`/place/${place.id}/reviews`);
                  }}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  See all reviews
                </button>
              </div>
              <div className="mt-4 space-y-4">
                {place.reviews && place.reviews.length > 0 ? (
                  place.reviews.slice(0, 2).map((review: any) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {review.user?.first_name?.[0] || 'U'}
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
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
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
                  <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PlaceDetails;