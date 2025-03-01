import express from 'express';
import prisma from '../lib/prisma.js';

const router = express.Router();

// Create user profile
router.post('/profile', async (req, res) => {
  try {
    const { auth_id, first_name, last_name, birth_date, explorer_type, email } = req.body;
    
    // Create user profile
    const userData = await prisma.users.create({
      data: {
        auth_id,
        first_name,
        last_name,
        birth_date: new Date(birth_date),
        explorer_type: explorer_type || 'both',
        email: email || `${auth_id}@example.com` // Fallback email if not provided
      }
    });

    res.json(userData);
  } catch (error) {
    console.error('Error creating user profile:', error);
    res.status(500).json({ error: 'Failed to create user profile' });
  }
});

// Create user preferences
router.post('/preferences', async (req, res) => {
  try {
    const { user_id, preferences } = req.body;
    
    // Format preferences for insertion
    const preferencesData = Object.entries(preferences).map(([category, level]) => ({
      category,
      interest_level: Number(level),
      user: { connect: { id: user_id } }
    }));

    // Create all preferences in a transaction
    const result = await prisma.$transaction(
      preferencesData.map(prefData => 
        prisma.user_preferences.create({
          data: prefData
        })
      )
    );

    res.json(result);
  } catch (error) {
    console.error('Error creating user preferences:', error);
    res.status(500).json({ error: 'Failed to create user preferences' });
  }
});

// Get user profile by auth_id
router.get('/profile/:auth_id', async (req, res) => {
  try {
    const { auth_id } = req.params;
    
    const userData = await prisma.users.findUnique({
      where: { auth_id },
      include: {
        preferences: true
      }
    });

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(userData);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

export default router;