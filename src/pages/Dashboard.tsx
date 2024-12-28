import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { UserSkills } from '../components/skills/UserSkills';

export function Dashboard() {
  const { user } = useAuth();
  const { profile, loading, error } = useProfile(user?.id);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error || !profile) {
    return <div className="text-red-500">Failed to load profile</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profile.full_name}</h1>
                <p className="text-gray-500">@{profile.username}</p>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-semibold">About</h2>
              <p className="mt-2 text-gray-600">{profile.bio || 'No bio provided'}</p>
            </div>
            <div className="mt-8">
              <UserSkills profileId={profile.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}