import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowLeft } from 'lucide-react';
import { api } from '../lib/api';
import { useStore } from '../store';
import ReviewItem from '../components/ReviewItem';
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';

const UserReviews = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchUserReviews = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }
      
      setIsLoading(true);
      try {
        const reviewsData = await api.reviews.getForUser(user.id);
        setReviews(reviewsData);
        console.log('User reviews:', reviewsData);
      } catch (error) {
        console.error('Error fetching user reviews:', error);
        toast.error('Failed to load your reviews');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserReviews();
  }, [user, navigate]);

  const handleDeleteReview = async (userId: string, placeId: string) => {
    setIsDeleting(true);
    try {
      await api.reviews.delete(userId, placeId);
      toast.success('Review deleted successfully');
      
      // Remove the deleted review from the list
      setReviews(reviews.filter(review => review.place_id !== placeId));
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Please sign in to view your reviews</h2>
          <button
            onClick={() => navigate('/auth')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner size="lg" className="text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Reviews</h1>
          <button
            onClick={() => navigate('/explore')}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Explore
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          {reviews.length > 0 ? (
            <div className="space-y-8">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-8 last:border-0">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{review.place.name}</h3>
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
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/place/${review.place_id}`)}
                        className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      >
                        View Place
                      </button>
                      <button
                        onClick={() => handleDeleteReview(user.id, review.place_id)}
                        disabled={isDeleting}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                      >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{review.comment}</p>
                  <p className="text-sm text-gray-500">
                    Reviewed on {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-500 mb-6">You haven't reviewed any places yet.</p>
              <button
                onClick={() => navigate('/explore')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Explore Places
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserReviews;