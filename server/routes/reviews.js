import express from 'express';
import prisma from '../lib/prisma.js';

const router = express.Router();

// Get reviews for a place
router.get('/place/:placeId', async (req, res) => {
  try {
    const { placeId } = req.params;
    const reviews = await prisma.reviews.findMany({
      where: { place_id: placeId },
      include: {
        user: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Create a review
router.post('/', async (req, res) => {
  try {
    const { userId, placeId, rating, comment } = req.body;

    const review = await prisma.reviews.create({
      data: {
        user_id: userId,
        place_id: placeId,
        rating,
        comment
      },
      include: {
        user: true,
        place: true
      }
    });

    // Update place average rating and total reviews
    await prisma.places.update({
      where: { id: placeId },
      data: {
        average_rating: {
          set: await calculateAverageRating(placeId)
        },
        total_reviews: {
          increment: 1
        }
      }
    });

    res.json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Update a review
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await prisma.reviews.update({
      where: { id },
      data: {
        rating,
        comment,
        updated_at: new Date()
      },
      include: {
        user: true,
        place: true
      }
    });

    // Update place average rating
    await prisma.places.update({
      where: { id: review.place_id },
      data: {
        average_rating: {
          set: await calculateAverageRating(review.place_id)
        }
      }
    });

    res.json(review);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// Delete a review
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get the review to find the place_id
    const review = await prisma.reviews.findUnique({
      where: { id }
    });
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    const placeId = review.place_id;

    // Delete the review
    await prisma.reviews.delete({
      where: { id }
    });

    // Update place average rating and total reviews
    await prisma.places.update({
      where: { id: placeId },
      data: {
        average_rating: {
          set: await calculateAverageRating(placeId)
        },
        total_reviews: {
          decrement: 1
        }
      }
    });

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

// Helper function to calculate average rating
async function calculateAverageRating(placeId) {
  const result = await prisma.reviews.aggregate({
    where: { place_id: placeId },
    _avg: {
      rating: true
    }
  });
  
  return result._avg.rating || 0;
}

export default router;