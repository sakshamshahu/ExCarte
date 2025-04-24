import express from "express";
import { SupabasePrismaClient } from "../lib/prisma.js";
import { getPrimaryClient } from "../lib/avaliablity.js";

const router = express.Router();

const PrismaClient = await getPrimaryClient();

// Create user profile
router.post("/profile", async (req, res) => {
  try {
    const { auth_id, first_name, last_name, birth_date, explorer_type, email } =
      req.body;

    // Create user profile
    const userData = await PrismaClient.client.users.create({
      data: {
        auth_id,
        first_name,
        last_name,
        birth_date: new Date(birth_date),
        explorer_type: explorer_type || "both",
        email: email || "",
      },
    });

    console.log("User profile created:", userData);

    console.info("Started creating user profile in Supabase");
    // Create user profile in Supabase
    if (PrismaClient.useLocalhost) {
      const userDataSupabase = await SupabasePrismaClient.users.create({
        data: {
          auth_id,
          first_name,
          last_name,
          birth_date: new Date(birth_date),
          explorer_type: explorer_type || "both",
          email: email || "",
        },
      });
      console.log("User profile created in Supabase:", userDataSupabase);
    }

    res.json(userData);
  } catch (error) {
    console.error("Error creating user profile:", error);
    res.status(500).json({ error: "Failed to create user profile" });
  }
});

// Create user preferences
router.post("/preferences", async (req, res) => {
  try {
    const { user_id, preferences } = req.body;

    // Ensure the user exists in PrismaClient
    const user = await PrismaClient.client.users.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Format preferences for insertion
    const preferencesData = Object.entries(preferences).map(
      ([category, level]) => ({
        user_id,
        category,
        interest_level: Number(level),
      })
    );

    // Update preferences using PrismaClient
    await PrismaClient.client.user_preferences.deleteMany({
      where: { user_id },
    });

    await PrismaClient.client.user_preferences.createMany({
      data: preferencesData,
    });

    console.log("User preferences updated in PrismaClient");

    // If useLocalhost is true, update preferences in Supabase
    if (PrismaClient.useLocalhost) {
      const supabasePreferencesData = Object.entries(preferences).map(
        ([category, level]) => ({
          user_id,
          category,
          interest_level: Number(level),
        })
      );

      await SupabasePrismaClient.user_preferences.deleteMany({
        where: { user_id },
      });

      await SupabasePrismaClient.user_preferences.createMany({
        data: supabasePreferencesData,
      });

      console.log("User preferences updated in Supabase");
    }

    res.json({ message: "Preferences updated successfully" });
  } catch (error) {
    console.error("Error updating preferences:", error);
    res.status(500).json({ error: "Failed to update preferences" });
  }
});

router.post("/update-profile-and-preferences", async (req, res) => {
  try {
    const {
      auth_id,
      first_name,
      last_name,
      birth_date,
      explorer_type,
      email,
      preferences,
    } = req.body;

    // Upsert user profile in PrismaClient
    const userData = await PrismaClient.client.users.upsert({
      where: { auth_id },
      update: {
        first_name,
        last_name,
        birth_date: new Date(birth_date),
        explorer_type: explorer_type || "both",
        email: email || "",
      },
      create: {
        auth_id,
        first_name,
        last_name,
        birth_date: new Date(birth_date),
        explorer_type: explorer_type || "both",
        email: email || "",
      },
    });

    console.log("User profile upserted:", userData);

    // Upsert user profile in Supabase
    if (PrismaClient.useLocalhost) {
      const userDataSupabase = await SupabasePrismaClient.users.upsert({
        where: { auth_id },
        update: {
          first_name,
          last_name,
          birth_date: new Date(birth_date),
          explorer_type: explorer_type || "both",
          email: email || "",
        },
        create: {
          auth_id,
          first_name,
          last_name,
          birth_date: new Date(birth_date),
          explorer_type: explorer_type || "both",
          email: email || "",
        },
      });

      console.log("User profile upserted in Supabase:", userDataSupabase);

      // Ensure the user exists in Supabase before creating preferences
      const supabaseUser = await SupabasePrismaClient.users.findUnique({
        where: { auth_id },
      });

      if (!supabaseUser) {
        throw new Error("User not found in Supabase after upsert");
      }

      // Format preferences for insertion
      const preferencesData = Object.entries(preferences).map(
        ([category, level]) => ({
          user_id: supabaseUser.id, // Use the Supabase user ID
          category,
          interest_level: Number(level),
        })
      );

      // Update preferences in Supabase
      await SupabasePrismaClient.user_preferences.deleteMany({
        where: { user_id: supabaseUser.id },
      });

      await SupabasePrismaClient.user_preferences.createMany({
        data: preferencesData,
      });

      console.log("User preferences updated in Supabase");
    }

    // Format preferences for insertion in PrismaClient
    const preferencesData = Object.entries(preferences).map(
      ([category, level]) => ({
        user_id: userData.id, // Use the Prisma user ID
        category,
        interest_level: Number(level),
      })
    );

    // Update preferences in PrismaClient
    await PrismaClient.client.user_preferences.deleteMany({
      where: { user_id: userData.id },
    });

    await PrismaClient.client.user_preferences.createMany({
      data: preferencesData,
    });

    console.log("User preferences updated in PrismaClient");

    res.json({ userData });
  } catch (error) {
    console.error("Error updating user profile and preferences:", error);
    res
      .status(500)
      .json({ error: "Failed to update user profile and preferences" });
  }
});

// Get user profile by auth_id
router.get("/profile/:auth_id", async (req, res) => {
  try {
    const { auth_id } = req.params;

    const userData = await PrismaClient.client.users.findUnique({
      where: { auth_id },
      include: {
        preferences: true,
      },
    });

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(userData);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

export default router;
