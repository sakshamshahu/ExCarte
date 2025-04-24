import express from "express";
import { LocalhostClient, SupabasePrismaClient } from "../lib/prisma.js";

const router = express.Router();

// Create user profile
router.post("/profile", async (req, res) => {
  try {
    const { auth_id, first_name, last_name, birth_date, explorer_type, email } =
      req.body;

    // Create user profile
    const userData = await LocalhostClient.users.create({
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

    // Ensure the user exists in Supabase
    const userInSupabase = await SupabasePrismaClient.users.findUnique({
      where: { id: user_id },
    });

    if (!userInSupabase) {
      return res.status(404).json({ error: "User not found in Supabase" });
    }

    // Ensure the user exists in Localhost
    const userInLocalhost = await LocalhostClient.users.findUnique({
      where: { id: user_id },
    });

    if (!userInLocalhost) {
      return res.status(404).json({ error: "User not found in Localhost" });
    }

    // Format preferences for insertion
    const preferencesData = Object.entries(preferences).map(
      ([category, level]) => ({
        category,
        interest_level: Number(level),
        user: { connect: { id: user_id } },
      })
    );

    // Create preferences in Localhost
    const localhostResult = await LocalhostClient.$transaction(
      preferencesData.map((prefData) =>
        LocalhostClient.user_preferences.create({
          data: prefData,
        })
      )
    );

    console.log("User preferences created in Localhost:", localhostResult);

    // Create preferences in Supabase
    const supabaseResult = await SupabasePrismaClient.$transaction(
      preferencesData.map((prefData) =>
        SupabasePrismaClient.user_preferences.create({
          data: prefData,
        })
      )
    );

    console.log("User preferences created in Supabase:", supabaseResult);

    res.json({ localhostResult, supabaseResult });
  } catch (error) {
    console.error("Error creating user preferences:", error);
    res.status(500).json({ error: "Failed to create user preferences" });
  }
});

// Update user profile and preferences
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

    // Create or update user profile in Localhost
    const userData = await LocalhostClient.users.upsert({
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

    console.log("User profile upserted in Localhost:", userData);

    // Create or update user profile in Supabase
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

    // Format preferences for insertion
    if (!userData.id || !userDataSupabase.id) {
      const userInLocalhost = await LocalhostClient.users.findUnique({
        where: { auth_id },
      });

      const userInSupabase = await SupabasePrismaClient.users.findUnique({
        where: { auth_id },
      });

      if (!userInLocalhost || !userInSupabase) {
        throw new Error(
          "User ID not found in one or both databases. Ensure the user profile exists before updating preferences."
        );
      }

      userData.id = userInLocalhost.id;
      userDataSupabase.id = userInSupabase.id;
    }

    // Format preferences for Localhost
    const preferencesDataLocalhost = Object.entries(preferences).map(
      ([category, level]) => ({
        user_id: userData.id, // Directly use user_id instead of connect
        category,
        interest_level: Number(level),
      })
    );

    // Format preferences for Supabase
    const preferencesDataSupabase = Object.entries(preferences).map(
      ([category, level]) => ({
        user_id: userDataSupabase.id, // Directly use user_id instead of connect
        category,
        interest_level: Number(level),
      })
    );

    // Create or update preferences in Localhost
    const localhostResult = await LocalhostClient.$transaction(
      preferencesDataLocalhost.map((prefData) =>
        LocalhostClient.user_preferences.upsert({
          where: {
            user_id_category: {
              user_id: userData.id,
              category: prefData.category,
            },
          },
          update: { interest_level: prefData.interest_level },
          create: {
            user_id: userData.id,
            category: prefData.category,
            interest_level: prefData.interest_level,
          },
        })
      )
    );

    // Create or update preferences in Supabase
    const supabaseResult = await SupabasePrismaClient.$transaction(
      preferencesDataSupabase.map((prefData) =>
        SupabasePrismaClient.user_preferences.upsert({
          where: {
            user_id_category: {
              user_id: userDataSupabase.id,
              category: prefData.category,
            },
          },
          update: { interest_level: prefData.interest_level },
          create: {
            user_id: userDataSupabase.id,
            category: prefData.category,
            interest_level: prefData.interest_level,
          },
        })
      )
    );

    console.log("User preferences upserted in Supabase:", supabaseResult);

    res.json({ userData, userDataSupabase, localhostResult, supabaseResult });
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

    const userData = await LocalhostClient.users.findUnique({
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
