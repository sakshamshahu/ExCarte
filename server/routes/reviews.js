import express from "express";
import { SupabasePrismaClient } from "../lib/prisma.js";
import { getPrimaryClient } from "../lib/avaliablity.js";

const router = express.Router();
const PrismaClient = await getPrimaryClient();
// Get reviews for a place
router.get("/place/:placeId", async (req, res) => {
  try {
    const { placeId } = req.params;
    const reviews = await PrismaClient.client.reviews.findMany({
      where: { place_id: placeId },
      include: {
        user: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// Create a review
router.post("/", async (req, res) => {
  try {
    const { userId, placeId, rating, comment } = req.body;

    // Validate user exists
    const user = await PrismaClient.client.users.findUnique({
      where: { auth_id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate place exists
    const place = await PrismaClient.client.places.findUnique({
      where: { id: placeId },
    });

    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }

    // Check if user already has a review for this place
    const existingReview = await PrismaClient.client.reviews.findFirst({
      where: {
        user_id: userId,
        place_id: placeId,
      },
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ error: "You have already reviewed this place" });
    }

    const review = await PrismaClient.client.reviews.create({
      data: {
        user_id: userId,
        place_id: placeId,
        rating,
        comment,
      },
      include: {
        user: true,
        place: true,
      },
    });

    // Update place average rating and total reviews
    await PrismaClient.client.places.update({
      where: { id: placeId },
      data: {
        average_rating: {
          set: await calculateAverageRating(placeId),
        },
        total_reviews: {
          increment: 1,
        },
      },
    });

    res.json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    res
      .status(500)
      .json({ error: "Failed to create review", details: error.message });
  }
});

// Update a review
router.put("/:userId/:placeId", async (req, res) => {
  try {
    const { userId, placeId } = req.params;
    const { rating, comment } = req.body;

    // Update the review in the primary database
    const review = await PrismaClient.client.reviews.update({
      where: { user_id_place_id: { user_id: userId, place_id: placeId } },
      data: {
        rating,
        comment,
        updated_at: new Date(),
      },
      include: {
        user: true,
        place: true,
      },
    });

    // Update place average rating
    await PrismaClient.client.places.update({
      where: { id: review.place_id },
      data: {
        average_rating: {
          set: await calculateAverageRating(review.place_id),
        },
      },
    });

    // Send the response immediately
    res.json(review);

    // Perform Supabase operations as a shadow process
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Failed to update review" });
  }
});

// Delete a review
router.delete("/:userId/:placeId", async (req, res) => {
  try {
    const { userId, placeId } = req.params;

    // Get the review to find the place_id
    const review = await PrismaClient.client.reviews.findUnique({
      where: { user_id_place_id: { user_id: userId, place_id: placeId } },
    });

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Delete the review
    await PrismaClient.client.reviews.delete({
      where: { user_id_place_id: { user_id: userId, place_id: placeId } },
    });

    // Update place average rating and total reviews
    await PrismaClient.client.places.update({
      where: { id: placeId },
      data: {
        average_rating: {
          set: await calculateAverageRating(placeId),
        },
        total_reviews: {
          decrement: 1,
        },
      },
    });

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Failed to delete review" });
  }
});

// Helper function to calculate average rating
async function calculateAverageRating(placeId) {
  const result = await PrismaClient.client.reviews.aggregate({
    where: { place_id: placeId },
    _avg: {
      rating: true,
    },
  });

  return result._avg.rating || 0;
}

export default router;
