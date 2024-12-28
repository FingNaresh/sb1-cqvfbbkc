import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ProfileForm } from '../components/ProfileForm';
import { SkillSelect } from '../components/skills/SkillSelect';
import { createProfile } from '../lib/profiles';
import { addUserSkills } from '../lib/skills';
import { ProfileFormData, ProficiencyLevel } from '../types/profile';

export function ProfileSetup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState<Record<string, ProficiencyLevel>>({});

  const handleSubmit = async (data: ProfileFormData) => {
    if (!user?.id) throw new Error('Not authenticated');
    await createProfile(user.id, data);
    await addUserSkills(user.id, selectedSkills);
    navigate('/dashboard');
  };

  const handleSkillSelect = (skillId: string, proficiency: ProficiencyLevel) => {
    setSelectedSkills(prev => ({
      ...prev,
      [skillId]: proficiency,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow space-y-8">
          <h1 className="text-2xl font-bold">Complete Your Profile</h1>
          <ProfileForm onSubmit={handleSubmit} />
          <SkillSelect 
            onSelect={handleSkillSelect}
            selectedSkills={selectedSkills}
          />
        </div>
      </div>
    </div>
  );
}