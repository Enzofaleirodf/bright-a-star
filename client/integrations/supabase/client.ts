import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://lsuyvkybrmddtsanvmvw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzdXl2a3licm1kZHRzYW52bXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NjQzNDksImV4cCI6MjA2NDU0MDM0OX0.vwgiKeTECIVr2WUO1eLaDBeAROHDp3_xWGEfg4oijwQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
