import express from 'express';
import prisma from '../lib/prisma.js';
import { supabase } from '../lib/supabase.js';
import placesData from '../config/places.json' assert { type: 'json' };

const router = express.Router();

// Seed places data from config
router.post('/seed', async (req, res) => {
  try {
    for (const place of placesData.places) {
      await prisma.places.upsert({
        where: { name: place.name },
        update: {
          description: place.description,
          category: place.category,
          latitude: place.latitude,
          longitude: place.longitude,
          address: place.address,
          city: place.city,
          images: place.images,
          tags: place.tags,
          opening_hours: place.opening_hours
        },
        create: {
          name: place.name,
          description: place.description,
          category: place.category,
          latitude: place.latitude,
          longitude: place.longitude,
          address: place.address,
          city: place.city,
          images: place.images,
          tags: place.tags,
          opening_hours: place.opening_hours
        }
      });
    }
    res.json({ message: 'Places seeded successfully' });
  } catch (error) {
    console.error('Error seeding places:', error);
    res.status(500).json({ error: 'Failed to seed places' });
  }
});

// Get all places with filters
router.get('/', async (req, res) => {
  try {
    const { 
      category,
      search,
      lat,
      lng,
      radius = 5000, // Default 5km radius
      time = new Date().toISOString(),
      date = new Date().toISOString().split('T')[0]
    } = req.query;

    let whereClause = {};
    
    if (category) {
      whereClause = {
        ...whereClause,
        category
      };
    }

    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      };
    }

    const places = await prisma.places.findMany({
      where: whereClause,
      include: {
        reviews: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        heat_score: 'desc'
      }
    });

    res.json(places);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ error: 'Failed to fetch places' });
  }
});

// Get heatmap data
router.get('/heatmap', async (req, res) => {
  try {
    const { 
      category,
      lat,
      lng,
      radius = 10000 // Default 10km radius
    } = req.query;

    let query = supabase
      .from('places')
      .select('id, latitude, longitude, heat_score, category');

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;

    const heatmapData = data.map(place => ({
      location: { lat: place.latitude, lng: place.longitude },
      weight: place.heat_score
    }));

    res.json(heatmapData);
  } catch (error) {
    console.error('Error fetching heatmap data:', error);
    res.status(500).json({ error: 'Failed to fetch heatmap data' });
  }
});

// Get place by ID with reviews
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const place = await prisma.places.findUnique({
      where: { id },
      include: {
        reviews: {
          include: {
            user: true
          }
        }
      }
    });

    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }

    res.json(place);
  } catch (error) {
    console.error('Error fetching place:', error);
    res.status(500).json({ error: 'Failed to fetch place' });
  }
});

export default router;