export type Profile = {
  id: string;
  username: string;
  full_name: string | null;
  bio: string | null;
  role: 'mentor' | 'mentee';
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Skill = {
  id: string;
  name: string;
  created_at: string;
};

export type UserSkill = {
  profile_id: string;
  skill_id: string;
  proficiency_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  created_at: string;
};

export type MentorshipRequest = {
  id: string;
  mentee_id: string;
  mentor_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  message: string | null;
  created_at: string;
  updated_at: string;
};