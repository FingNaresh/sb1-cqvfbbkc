import React from 'react';
import { ProficiencyLevel } from '../../types/profile';
import { useSkills } from '../../hooks/useSkills';

type SkillSelectProps = {
  onSelect: (skillId: string, proficiency: ProficiencyLevel) => void;
  selectedSkills: Record<string, ProficiencyLevel>;
};

export function SkillSelect({ onSelect, selectedSkills }: SkillSelectProps) {
  const { skills, loading, error } = useSkills();

  if (loading) {
    return <div>Loading skills...</div>;
  }

  if (error) {
    return <div className="text-red-500">Failed to load skills</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select Your Skills</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((skill) => (
          <div key={skill.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{skill.name}</span>
            </div>
            <select
              value={selectedSkills[skill.id] || ''}
              onChange={(e) => onSelect(skill.id, e.target.value as ProficiencyLevel)}
              className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select proficiency</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}