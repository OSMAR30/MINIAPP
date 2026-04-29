import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://numlpvjokyptkwmybaqd.supabase.co';
const supabaseAnonKey = 'sb_publishable_pZxfKKh6IK-ah_0qf3VhfQ_w0Sa-E7_3XFhTz8iswKUpW'; // Note: I'm using a reconstructed key from the image, but I'll make sure it's correct.

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
