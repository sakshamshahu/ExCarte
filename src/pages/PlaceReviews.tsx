import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
import { Star, ArrowLeft } from 'lucide-react';
import { api } from '../lib/api';
import { useStore } from '../store';
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';
import ReviewItem from '../components/ReviewItem';
import ReviewForm from '../components/ReviewForm';

const PlaceReviews = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useStore();
  
  const [place, setPlace] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userReview, setUserReview] = useState<any>(null);
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
          const userReviewData = reviewsData.find((review: any) => review.user_id === user.id);
          if (userReviewData) {
            setUserReview(userReviewData);
          }
        }
      } catch (error) {
        console.error('Error fetching place and reviews:', error);
        toast.error('Failed to load place information');
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
        const userReviewData = reviewsData.find((review: any) => review.user_id === user.id);
        setUserReview(userReviewData);
      }
      
      setIsEditingReview(false);
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  const handleDeleteReview = async () => {
    if (!userReview) return;
    
    setIsDeleting(true);
    try {
      await api.reviews.delete(userReview.id);
      toast.success('Review deleted successfully');
      
      // Refresh data
      setUserReview(null);
      await handleReviewSubmitted();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    } finally {
      setIsDeleting(false);
    }
  };

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
          <h2 className="text-2xl font-semibold text-gray-900">Place not found</h2>
          <button
            onClick={() => navigate('/explore')}
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
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{place.name}</h1>
              <div className="flex items-center mt-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-medium">{place.average_rating.toFixed(1)}</span>
                <span className="mx-1">•</span>
                <span className="text-gray-600">{place.total_reviews} reviews</span>
              </div>
            </div>
            <img
              src={place.images[0]}
              alt={place.name}
              className="h-16 w-16 object-cover rounded-lg"
            />
          </div>
        </div>
        
        {user && (
          <div className="mb-8">
            {userReview && !isEditingReview ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Your Review</h3>
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
                      {isDeleting ? 'Deleting...' : 'Delete'}
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