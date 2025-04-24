// This file is kept for compatibility but no longer used directly in the frontend
// All Supabase operations are now handled through the server API

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// This client is no longer used directly in the frontend
// It's kept for reference only
export const supabase = createClient(supabaseUrl, supabaseKey);