'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, UseDispatch } from 'react-redux';
import Image from 'next/image';
import { setUserEmail } from '@/lib/redux/slices/emailSLice';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (res.ok) {
        dispatch(setUserEmail(data. email));
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Ошибка входа');
      }
    } catch (err) {
      setError('Произошла ошибка. Попробуйте снова.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center main-background">
      <div className="flex items-center justify-center bg-white authorization-form">
        <div className="authorization-form--left">
            <h1 className="text-6xl font-bold mb-5 uppercase title-color">Вход</h1>
            <p className='additional-text-color mb-8'>Для входа в систему административной панели отеля Arena Beach введите свои учетные данные.</p>
            <Image src="/svg/logo/logo.svg" alt="Логотип" />
        </div>
        <div className='authorization-form--right'>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="text-right">
            <div className='authorization-form--inputs mb-6 space-y-4'>
              <div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="authorization-form--input-panel w-full"
                  required
                  placeholder='Email'
                />
              </div>
              <div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="authorization-form--input-panel w-full"
                  required
                  placeholder='Пароль'
                />
              </div>
            </div>
            <button
              type="submit"
              className="authorization-form--submit-button"
            >
              Войти в аккаунт
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}