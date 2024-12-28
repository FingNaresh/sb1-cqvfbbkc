import { supabase } from './supabase';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUp = async (email: string, password: string) => {
  const result = authSchema.safeParse({ email, password });
  if (!result.success) {
    throw new Error('Invalid email or password');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signIn = async (email: string, password: string) => {
  const result = authSchema.safeParse({ email, password });
  if (!result.success) {
    throw new Error('Invalid email or password');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  
  // Check if profile exists
  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', data.user.id);

  if (profileError) throw profileError;
  
  // Redirect to profile setup if no profile exists
  if (!profiles || profiles.length === 0) {
    window.location.href = '/profile/setup';
  }

  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};