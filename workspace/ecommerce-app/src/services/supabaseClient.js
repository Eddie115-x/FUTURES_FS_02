import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Validate Supabase environment variables
if (!supabaseUrl) {
  console.error('Missing REACT_APP_SUPABASE_URL environment variable');
}

if (!supabaseKey) {
  console.error('Missing REACT_APP_SUPABASE_ANON_KEY environment variable');
}

// Log in development only
if (process.env.NODE_ENV === 'development') {
  console.log('Supabase URL:', supabaseUrl?.substring(0, 10) + '...');
  console.log('Supabase Key defined:', !!supabaseKey);
}

export const supabase = createClient(supabaseUrl, supabaseKey);
