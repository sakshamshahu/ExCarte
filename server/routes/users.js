import express from 'express';
import prisma from '../lib/prisma.js';
import { supabase } from '../lib/supabase.js';

const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.users.findUnique({
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

    const updatedUser = await prisma.users.update({
      where: { id },
      data: {
        preferences: {
          deleteMany: {},
          create: Object.entries(preferences).map(([category, level]) => ({
            category,
            interest_level: level
          }))
        }
      },
      include: {
        preferences: true
      }
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating preferences:', error);
    res.status(500).json({ error: 'Failed to update preferences' });
  }
});

export default router;