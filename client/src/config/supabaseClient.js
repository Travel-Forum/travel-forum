import { createClient } from '@supabase/supabase-js';

import { supabaseUrl, supabasePublishableKey } from './environments';

// export const supabase = createClient(supabaseUrl, supabasePublishableKey);

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    flowType: 'pkce',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});