import express from 'express';
import { SupabasePrismaClient }  from '../lib/prisma.js';

const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await SupabasePrismaClient.users.findUnique({
      where: { id },
      include: {
        preferences: true,
        reviews: {
          include: {
            place: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user preferences
router.post('/:id/preferences', async (req, res) => {
  try {
    const { id } = req.params;
    const { preferences } = req.body;

    // Delete existing preferences
    await SupabasePrismaClient.user_preferences.deleteMany({
      where: { user_id: id }
    });

    // Create new preferences
    const preferencesData = Object.entries(preferences).map(([category, level]) => ({
      user_id: id,
      category,
      interest_level: Number(level)
    }));

    await SupabasePrismaClient.user_preferences.createMany({
      data: preferencesData
    });

    const updatedUser = await SupabasePrismaClient.users.findUnique({
      where: { id },
      include: {
        preferences: true
      }
    });

    res.end(updatedUser);
    console.info('Started updating user preferences in Supabase');
    // Update user preferences in Supabase
    const supabaseResult = await SupabasePrisma.user_preferences.deleteMany({
      where: { user_id: id }
    });
    console.log('User preferences updated in Supabase:', supabaseResult);
    // Create new preferences in Supabase
    await SupabasePrisma.user_preferences.createMany({
      data: preferencesData
    });
    console.log('User preferences created in Supabase:', supabaseResult);
  } catch (error) {
    console.error('Error updating preferences:', error);
    res.status(500).json({ error: 'Failed to update preferences' });
  }
});

export default router;