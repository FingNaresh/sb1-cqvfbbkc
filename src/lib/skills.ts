import { supabase } from './supabase';
import type { ProficiencyLevel } from '../types/profile';

export async function addUserSkills(
  profileId: string,
  skills: Record<string, ProficiencyLevel>
) {
  const skillEntries = Object.entries(skills).map(([skillId, proficiency]) => ({
    profile_id: profileId,
    skill_id: skillId,
    proficiency_level: proficiency,
  }));

  const { error } = await supabase
    .from('user_skills')
    .insert(skillEntries);

  if (error) throw error;
}

export async function getUserSkills(profileId: string) {
  const { data, error } = await supabase
    .from('user_skills')
    .select(`
      skill_id,
      proficiency_level,
      skills (
        id,
        name
      )
    `)
    .eq('profile_id', profileId);

  if (error) throw error;
  return data;
}