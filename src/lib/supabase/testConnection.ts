import { supabase } from './client';

export const testSupabaseConnection = async () => {
  if (!__DEV__) return;
  
  try {
    console.log('Testing Supabase Connection...');
    console.log('URL configured:', !!process.env.EXPO_PUBLIC_SUPABASE_URL);
    
    // Minimal communication test without hitting a specific table or creating fake data
    const { error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Supabase Connection Error:', error.message);
    } else {
      console.log('Supabase Connection SUCCESS: Client initialized and communicating.');
    }
  } catch (err) {
    console.error('Supabase Connection FAILED:', err);
  }
};
