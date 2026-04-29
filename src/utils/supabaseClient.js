import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://numlpvjokyptkwmybaqd.supabase.co';
const supabaseAnonKey = 'sb_publishable_pZxfKKh6IK-ah_Oqf3VhfQ_w0Sa-K99';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

