'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { allPaths } from '../../allPaths';
import './login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
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

  return (
    <div className="woh__login-page">
      <div className="woh__login-card">
        <div className="woh__login-header">
          <span className="woh__login-icon">🏡</span>
          <h2 className="woh__login-title">w00t!</h2>
        </div>
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
      </div>
    </div>
  );
}
