// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gymiikmhphwkoyauilof.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5bWlpa21ocGh3a295YXVpbG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NjQzNDQsImV4cCI6MjA2NjI0MDM0NH0.R9q_bWphuCaM2ohZ0BI0W7GlczMpFs2dM3eT3q9n8gQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);