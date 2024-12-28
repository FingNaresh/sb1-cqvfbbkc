import { useEffect, useState } from 'react';
import { getUserSkills } from '../lib/skills';
import type { UserSkill } from '../types';

export function useUserSkills(profileId: string) {
  const [skills, setSkills] = useState<UserSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const data = await getUserSkills(profileId);
        setSkills(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch user skills'));
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, [profileId]);

  return { skills, loading, error };
}