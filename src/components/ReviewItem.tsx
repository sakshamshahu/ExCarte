import React from 'react';
import { Star, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useStore } from '../store';

interface ReviewItemProps {
  review: {
    id: string;
    user_id: string;
    rating: number;
    comment: string;
    created_at: string;
    user: {
      first_name: string;
      last_name: string;
    };
  };
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ 
  review, 
  onEdit, 
  onDelete,
  showActions = false
}) => {
  const { user } = useStore();
  const isCurrentUserReview = user && user.id === review.user_id;
  const formattedDate = format(new Date(review.created_at), 'MMM d, yyyy');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-gray-200 pb-6 mb-6 last:border-0 last:mb-0 last:pb-0"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-indigo-600 font-medium">
              {review.user.first_name[0]}
            </span>
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-900">
              {review.user.first_name} {review.user.last_name}
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
              <span className="ml-2 text-sm text-gray-500">{formattedDate}</span>
            </div>
          </div>
        </div>
        
        {showActions && isCurrentUserReview && (
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onEdit}
              className="p-1 text-gray-500 hover:text-indigo-600"
            >
              <Edit className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onDelete}
              className="p-1 text-gray-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </motion.button>
          </div>
        )}
      </div>
      
      <p className="mt-3 text-gray-600">{review.comment}</p>
    </motion.div>
  );
};

export default ReviewItem;