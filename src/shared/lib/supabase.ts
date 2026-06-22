import { createClient } from "@supabase/supabase-js";
import { ENV } from "@/config/env";

export const supabase =
  ENV.supabaseUrl && ENV.supabaseAnonKey
    ? createClient(ENV.supabaseUrl, ENV.supabaseAnonKey)
    : null;
