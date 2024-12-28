import { z } from 'zod';

export const roleSchema = z.enum(['mentor', 'mentee']);
export type Role = z.infer<typeof roleSchema>;

export const proficiencySchema = z.enum(['beginner', 'intermediate', 'advanced', 'expert']);
export type ProficiencyLevel = z.infer<typeof proficiencySchema>;

export const profileSchema = z.object({
  username: z.string().min(3).max(50),
  full_name: z.string().min(2).max(100).optional(),
  bio: z.string().max(500).optional(),
  role: roleSchema,
  avatar_url: z.string().url().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;