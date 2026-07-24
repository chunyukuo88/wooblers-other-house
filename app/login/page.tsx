'use client';
import { FormEvent, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { allPaths } from '../../allPaths';
import { SignInResult } from './types';
import './login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result: SignInResult = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError('Invalid username or password.');
    } else {
      router.push(allPaths.HOME);
    }
  };

  const signOutHandler = () => signOut({ callbackUrl: allPaths.HOME });

  const SignOutButton = () => (
    <button className="woh__logout-button" onClick={signOutHandler}>
      Leave, bread monster
    </button>
  );

  const SignInPanel = () => (
    <form className="woh__login-form" onSubmit={handleSubmit}>
      <div className="woh__login-field">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Admin username"
          autoComplete="username"
        />
      </div>
      <div className="woh__login-field">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          autoComplete="current-password"
        />
      </div>
      {error && <p className="woh__login-error">{error}</p>}
      <button
        type="submit"
        className="woh__login-button"
        disabled={loading || !username || !password}
      >
        {loading ? 'Doing it…' : 'Do it'}
      </button>
    </form>
  );

  return (
    <div className="woh__login-page">
      <div className="woh__login-card">
        <div className="woh__login-header">
          <span className="woh__login-icon">🏡</span>
          <h2 className="woh__login-title">w00t!</h2>
        </div>
        {status === 'authenticated' ? <SignOutButton /> : <SignInPanel />}
      </div>
    </div>
  );
}
