import { supabase } from './supabase';
import { ProfileFormData, profileSchema } from '../types/profile';

export async function createProfile(userId: string, data: ProfileFormData) {
  const result = profileSchema.safeParse(data);
  if (!result.success) {
    throw new Error('Invalid profile data');
  }

  const { error } = await supabase
    .from('profiles')
    .insert([{ id: userId, ...data }]);

  if (error) throw error;
}

export async function updateProfile(userId: string, data: Partial<ProfileFormData>) {
  const { error } = await supabase
    .from('profiles')
    .update(data)
    .eq('id', userId);

  if (error) throw error;
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId);

  if (error) throw error;
  
  // Return null if no profile found
  return data && data.length > 0 ? data[0] : null;
}