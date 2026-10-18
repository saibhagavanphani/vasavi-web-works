import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yyvndtkaesbgnwfvbawg.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5dm5kdGthZXNidG53ZnZiYXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAzNTI0ODksImV4cCI6MjEwNTkyODQ4OX0.dPnMKZemlDpuB11DzeJI1hxP3lSI-z1s4kcEXEnipFw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  budget: string | null;
  message: string;
  status: string;
  created_at: string;
};
