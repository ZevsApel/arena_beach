'use client';

import { useState } from 'react';
import { useLogin, Notification, Loading } from 'react-admin';

export default function LoginPage() {
  const login = useLogin();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.target);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      await login({ username, password });
    } catch (err: any) {
      setError(err?.message || 'Ошибка авторизации');
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f2f2f2',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          padding: 40,
          borderRadius: 12,
          background: '#fff',
          width: 360,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ marginBottom: 20, textAlign: 'center' }}>Вход в админку</h2>

        {error && (
          <div
            style={{
              marginBottom: 16,
              color: 'red',
              textAlign: 'center',
              fontSize: 14,
            }}
          >
            {error}
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <input
            name="username"
            placeholder="Email"
            required
            style={{
              width: '100%',
              padding: 10,
              borderRadius: 6,
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            required
            style={{
              width: '100%',
              padding: 10,
              borderRadius: 6,
              border: '1px solid #ccc',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: 12,
            borderRadius: 6,
            background: '#0070f3',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>

      <Notification />
      {loading && <Loading />}
    </div>
  );
}
