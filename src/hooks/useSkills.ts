import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Skill } from '../types';

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('name');

        if (error) throw error;
        setSkills(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch skills'));
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  return { skills, loading, error };
}