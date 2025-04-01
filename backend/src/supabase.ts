import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.SUPABASE_PROJET_URL as string,
  process.env.SUPABASE_API_KEY as string,
);

export default supabase;
