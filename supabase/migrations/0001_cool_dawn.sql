/*
  # Initial Schema Setup for Mentorship Platform

  1. New Tables
    - profiles
      - id (uuid, primary key, references auth.users)
      - username (text, unique)
      - full_name (text)
      - bio (text)
      - role (text - either 'mentor' or 'mentee')
      - avatar_url (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - skills
      - id (uuid, primary key)
      - name (text, unique)
      - created_at (timestamp)
    
    - user_skills
      - profile_id (uuid, references profiles)
      - skill_id (uuid, references skills)
      - proficiency_level (text)
      - created_at (timestamp)
      - PRIMARY KEY (profile_id, skill_id)
    
    - mentorship_requests
      - id (uuid, primary key)
      - mentee_id (uuid, references profiles)
      - mentor_id (uuid, references profiles)
      - status (text - 'pending', 'accepted', 'rejected')
      - message (text)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access control
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  full_name text,
  bio text,
  role text CHECK (role IN ('mentor', 'mentee')) NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_skills table
CREATE TABLE user_skills (
  profile_id uuid REFERENCES profiles ON DELETE CASCADE,
  skill_id uuid REFERENCES skills ON DELETE CASCADE,
  proficiency_level text CHECK (proficiency_level IN ('beginner', 'intermediate', 'advanced', 'expert')) NOT NULL,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (profile_id, skill_id)
);

-- Create mentorship_requests table
CREATE TABLE mentorship_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mentee_id uuid REFERENCES profiles ON DELETE CASCADE,
  mentor_id uuid REFERENCES profiles ON DELETE CASCADE,
  status text CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
  message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_requests ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Skills policies
CREATE POLICY "Skills are viewable by everyone"
  ON skills FOR SELECT
  USING (true);

CREATE POLICY "Only authenticated users can insert skills"
  ON skills FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- User skills policies
CREATE POLICY "User skills are viewable by everyone"
  ON user_skills FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own skills"
  ON user_skills FOR ALL
  USING (auth.uid() = profile_id);

-- Mentorship requests policies
CREATE POLICY "Users can view their own mentorship requests"
  ON mentorship_requests FOR SELECT
  USING (auth.uid() IN (mentee_id, mentor_id));

CREATE POLICY "Mentees can create mentorship requests"
  ON mentorship_requests FOR INSERT
  WITH CHECK (auth.uid() = mentee_id);

CREATE POLICY "Users can update their own mentorship requests"
  ON mentorship_requests FOR UPDATE
  USING (auth.uid() IN (mentee_id, mentor_id));