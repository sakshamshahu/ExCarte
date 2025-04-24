import express from "express";
import { SupabasePrismaClient } from "../lib/prisma.js";
import { getPrimaryClient } from "../lib/avaliablity.js";

const router = express.Router();
const PrismaClient = await getPrimaryClient();
// Get user profile
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await PrismaClient.client.users.findUnique({
      where: { id },
      include: {
        preferences: true,
        reviews: {
          include: {
            place: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

router.get("/:id/reviews", async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await PrismaClient.client.reviews.findMany({
      where: { user_id: id },
      include: {
        place: true,
      },
    });

    if (!reviews) {
      return res.status(404).json({ error: "No reviews found for this user" });
    }

    res.json(reviews);
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    res.status(500).json({ error: "Failed to fetch user reviews" });
  }
});

// Update user preferences
router.post("/:id/preferences", async (req, res) => {
  try {
    const { id } = req.params;
    const { preferences } = req.body;

    // Delete existing preferences
    await PrismaClient.client.user_preferences.deleteMany({
      where: { user_id: id },
    });

    // Create new preferences
    const preferencesData = Object.entries(preferences).map(
      ([category, level]) => ({
        user_id: id,
        category,
        interest_level: Number(level),
      })
    );

    await PrismaClient.client.user_preferences.createMany({
      data: preferencesData,
    });

    const updatedUser = await PrismaClient.client.users.findUnique({
      where: { id },
      include: {
        preferences: true,
      },
    });

    res.end(updatedUser);
    if (PrismaClient.useLocalhost) {
      console.info("Started updating user preferences in Supabase");
      // Update user preferences in Supabase
      const supabaseResult =
        await SupabasePrismaClient.user_preferences.deleteMany({
          where: { user_id: id },
        });
      console.log("User preferences updated in Supabase:", supabaseResult);
      // Create new preferences in Supabase
      await SupabasePrismaClient.user_preferences.createMany({
        data: preferencesData,
      });
      console.log("User preferences created in Supabase:", supabaseResult);
    }
  } catch (error) {
    console.error("Error updating preferences:", error);
    res.status(500).json({ error: "Failed to update preferences" });
  }
});

export default router;
