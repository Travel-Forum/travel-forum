import { createClient } from '@supabase/supabase-js';

import { supabaseUrl, supabasePublishableKey } from './constants';

export const supabase = createClient(supabaseUrl, supabasePublishableKey);