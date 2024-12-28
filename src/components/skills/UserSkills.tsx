import React from 'react';
import { useUserSkills } from '../../hooks/useUserSkills';

type UserSkillsProps = {
  profileId: string;
};

export function UserSkills({ profileId }: UserSkillsProps) {
  const { skills, loading, error } = useUserSkills(profileId);

  if (loading) return <div>Loading skills...</div>;
  if (error) return <div className="text-red-500">Failed to load skills</div>;
  if (!skills.length) return <div>No skills added yet</div>;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Skills</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((skill) => (
          <div key={skill.skill_id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">{skill.skills.name}</span>
              <span className="text-sm text-gray-500 capitalize">
                {skill.proficiency_level}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}