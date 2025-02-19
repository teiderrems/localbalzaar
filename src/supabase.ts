import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.SUPABASE_PROJET_URL ?? 'https://nwlkquzdduffwuceqqnp.supabase.co',
  process.env.SUPABASE_API_KEY ??
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53bGtxdXpkZHVmZnd1Y2VxcW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMjkyODAsImV4cCI6MjA1NDcwNTI4MH0.SLOgaKiYjC9AUkJvxEttFL-Rb1cdDb5IPriuy5FK-6o',
);

export default supabase;
