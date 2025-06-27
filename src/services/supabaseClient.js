import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Use fallback values for development or if env vars are missing
const safeSupabaseUrl = supabaseUrl || 'https://zygbtjyyiqtfkrqvheyj.supabase.co';
const safeSupabaseKey = supabaseKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6cmJpem9oemx0aG5naXJqYnR5IiwicmVmX3JvbGUiOiJhbm9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzNDczOTksImV4cCI6MjAzNDkyMzM5OX0.fallback_key';

// Validate Supabase environment variables
if (!supabaseUrl) {
  console.warn('Missing REACT_APP_SUPABASE_URL environment variable - using fallback');
}

if (!supabaseKey) {
  console.warn('Missing REACT_APP_SUPABASE_ANON_KEY environment variable - using fallback');
}

// Log in development only
if (process.env.NODE_ENV === 'development') {
  console.log('Supabase URL:', safeSupabaseUrl.substring(0, 10) + '...');
  console.log('Supabase Key defined:', !!safeSupabaseKey);
}

// Create client with fallback values if needed
export const supabase = createClient(safeSupabaseUrl, safeSupabaseKey);
