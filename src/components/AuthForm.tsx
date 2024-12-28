import React, { useState } from 'react';
import { signIn, signUp } from '../lib/auth';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isSignUp) {
        await signUp(email, password);
        setError('Check your email to confirm your account!');
      } else {
        await signIn(email, password);
      }
    } catch (err: any) {
      if (err?.message === 'User already registered') {
        setError('This email is already registered. Please sign in instead.');
        setIsSignUp(false);
      } else {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={loading}
      />
      {error && (
        <p className={`text-sm ${error.includes('Check your email') ? 'text-green-600' : 'text-red-500'}`}>
          {error}
        </p>
      )}
      <Button type="submit" disabled={loading}>
        {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
      </Button>
      <button
        type="button"
        onClick={() => {
          setIsSignUp(!isSignUp);
          setError('');
        }}
        className="text-sm text-gray-600 hover:underline"
        disabled={loading}
      >
        {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
      </button>
    </form>
  );
}