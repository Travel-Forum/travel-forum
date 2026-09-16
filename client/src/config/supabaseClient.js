import { createClient } from '@supabase/supabase-js';

import { supabaseUrl, supabasePublishableKey } from './environments';

export const supabase = createClient(supabaseUrl, supabasePublishableKey);