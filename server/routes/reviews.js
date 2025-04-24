import express from "express";
import { LocalhostClient, SupabasePrismaClient } from "../lib/prisma.js";

const router = express.Router();

// Get reviews for a place
router.get("/place/:placeId", async (req, res) => {
  try {
    const { placeId } = req.params;
    const reviews = await LocalhostClient.reviews.findMany({
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
    const user = await LocalhostClient.users.findUnique({
      where: { auth_id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate place exists
    const place = await LocalhostClient.places.findUnique({
      where: { id: placeId },
    });

    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }

    // Check if user already has a review for this place
    const existingReview = await LocalhostClient.reviews.findFirst({
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

    const review = await LocalhostClient.reviews.create({
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
    await LocalhostClient.places.update({
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
    console.info("Started creating review in Supabase");
    // Create review in Supabase
    const supabaseResult = await SupabasePrismaClient.reviews.create({
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
router.put("/:userId/:placeId", async (req, res) => {
  try {
    const { userId, placeId } = req.params;
    const { rating, comment } = req.body;

    const review = await LocalhostClient.reviews.update({
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
    await LocalhostClient.places.update({
      where: { id: review.place_id },
      data: {
        average_rating: {
          set: await calculateAverageRating(review.place_id),
        },
      },
    });

    res.json(review);
    console.info("Started updating review in Supabase");
    // Update review in Supabase
    const supabaseResult = await SupabasePrismaClient.reviews.update({
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
    await SupabasePrismaClient.places.update({
      where: { id: supabaseResult.place_id },
      data: {
        average_rating: {
          set: await calculateAverageRating(supabaseResult.place_id),
        },
      },
    });
    console.log("Review updated in Supabase:", supabaseResult);
    res.json(supabaseResult);
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
    const review = await LocalhostClient.reviews.findUnique({
       where: { user_id_place_id: { user_id: userId, place_id: placeId } },
    });

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Delete the review
    await LocalhostClient.reviews.delete({
      where: { user_id_place_id: { user_id: userId, place_id: placeId } },
    });

    // Update place average rating and total reviews
    await LocalhostClient.places.update({
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
    console.info("Started deleting review from Supabase");
    // Delete review from Supabase
    const resp = await removeReviewFromSupabase(userId, placeId);
    res.json(resp);
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Failed to delete review" });
  }
});

async function removeReviewFromSupabase(userId, placeId) {
  try {
    console.info("Started deleting review from Supabase");
    const result = await SupabasePrismaClient.reviews.delete({
      where: { user_id: userId, place_id: placeId },
    });
    await SupabasePrismaClient.places.update({
      where: { id: result.place_id },
      data: {
        average_rating: {
          set: await calculateAverageRating(result.place_id),
        },
        total_reviews: {
          decrement: 1,
        },
      },
    });
    console.log("Review deleted from Supabase:", result);
    return result;
  } catch (error) {
    console.error("Error deleting review from Supabase:", error);
  }
}

// Helper function to calculate average rating
async function calculateAverageRating(placeId) {
  const result = await LocalhostClient.reviews.aggregate({
    where: { place_id: placeId },
    _avg: {
      rating: true,
    },
  });

  return result._avg.rating || 0;
}

export default router;
