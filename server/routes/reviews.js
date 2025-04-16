import express from "express";
import { GCPprisma } from "../lib/prisma.js";

const router = express.Router();

// Get reviews for a place
router.get("/place/:placeId", async (req, res) => {
  try {
    const { placeId } = req.params;
    const reviews = await GCPprisma.reviews.findMany({
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
    const user = await GCPprisma.users.findUnique({
      where: { auth_id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate place exists
    const place = await GCPprisma.places.findUnique({
      where: { id: placeId },
    });

    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }

    // Check if user already has a review for this place
    const existingReview = await GCPprisma.reviews.findFirst({
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

    const review = await GCPprisma.reviews.create({
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
    await GCPprisma.places.update({
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

    res.end(review);
    console.info("Started creating review in Supabase");
    // Create review in Supabase
    const supabaseResult = await SupabasePrisma.reviews.create({
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
    console.log("Review created in Supabase:", supabaseResult);
  } catch (error) {
    console.error("Error creating review:", error);
    res
      .status(500)
      .json({ error: "Failed to create review", details: error.message });
  }
});

// Update a review
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await GCPprisma.reviews.update({
      where: { id },
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
    await GCPprisma.places.update({
      where: { id: review.place_id },
      data: {
        average_rating: {
          set: await calculateAverageRating(review.place_id),
        },
      },
    });

    res.json(review);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Failed to update review" });
  }
});

// Delete a review
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Get the review to find the place_id
    const review = await GCPprisma.reviews.findUnique({
      where: { id },
    });

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    const placeId = review.place_id;

    // Delete the review
    await GCPprisma.reviews.delete({
      where: { id },
    });

    // Update place average rating and total reviews
    await GCPprisma.places.update({
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
  const result = await GCPprisma.reviews.aggregate({
    where: { place_id: placeId },
    _avg: {
      rating: true,
    },
  });

  return result._avg.rating || 0;
}

export default router;
