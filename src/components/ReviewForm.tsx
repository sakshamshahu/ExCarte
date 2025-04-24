import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import { useStore } from '../store';
import toast from 'react-hot-toast';
import Spinner from './Spinner';

interface ReviewFormProps {
  placeId: string;
  onReviewSubmitted: () => void;
  existingReview?: {
    id: string;
    rating: number;
    comment: string;
  };
}

const ReviewForm: React.FC<ReviewFormProps> = ({ placeId, onReviewSubmitted, existingReview }) => {
  const { user } = useStore();
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || '');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to submit a review');
      return;
    }
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (existingReview) {
        // Update existing review
        await api.reviews.update(existingReview.id, {
          rating,
          comment
        });
        toast.success('Review updated successfully');
      } else {
        // Create new review
        await api.reviews.create({
          userId: user.id,
          placeId,
          rating,
          comment
        });
        toast.success('Review submitted successfully');
      }
      
      onReviewSubmitted();
      
      // Reset form if it's a new review
      if (!existingReview) {
        setRating(0);
        setComment('');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(existingReview ? 'Failed to update review' : 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {existingReview ? 'Edit Your Review' : 'Write a Review'}
      </h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              type="button"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`h-8 w-8 ${
                  star <= (hoveredRating || rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            </motion.button>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          Your Review
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this place..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600"
          disabled={isSubmitting}
        />
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
        >
          {isSubmitting ? (
            <Spinner size="sm" className="text-white" />
          ) : (
            existingReview ? 'Update Review' : 'Submit Review'
          )}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;