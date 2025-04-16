import express from 'express';
import { GCPprisma, SupabasePrisma } from '../lib/prisma.js';

const router = express.Router();

// Create user profile
router.post('/profile', async (req, res) => {
  try {
    const { auth_id, first_name, last_name, birth_date, explorer_type, email } = req.body;
    
    // Create user profile
    const userData = await GCPprisma.users.create({
      data: {
        auth_id,
        first_name,
        last_name,
        birth_date: new Date(birth_date),
        explorer_type: explorer_type || 'both',
        email: email || ''
      }
    });

    console.log('User profile created:', userData);
    // Send response
    res.end(userData);

    console.info('Started creating user profile in Supabase');
    // Create user profile in Supabase
    const userDataSupabase = await SupabasePrisma.users.create({
      data: {
        auth_id,
        first_name,
        last_name,
        birth_date: new Date(birth_date),
        explorer_type: explorer_type || 'both',
        email: email || ''
      }
    });
    console.log('User profile created in Supabase:', userDataSupabase);
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
    const result = await GCPprisma.$transaction(
      preferencesData.map(prefData => 
        GCPprisma.user_preferences.create({
          data: prefData
        })
      )
    );

    res.end(result);

    console.info('Started creating user preferences in Supabase');
    // Create user preferences in Supabase
    const supabaseResult = await SupabasePrisma.$transaction(
      preferencesData.map(prefData => 
        SupabasePrisma.user_preferences.create({
          data: prefData
        })
      )
    );
    console.log('User preferences created in Supabase:', supabaseResult);
  } catch (error) {
    console.error('Error creating user preferences:', error);
    res.status(500).json({ error: 'Failed to create user preferences' });
  }
});

// Get user profile by auth_id
router.get('/profile/:auth_id', async (req, res) => {
  try {
    const { auth_id } = req.params;
    
    const userData = await GCPprisma.users.findUnique({
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