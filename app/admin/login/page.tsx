'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { setUserEmail } from '@/lib/redux/slices/emailSLice';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        dispatch(setUserEmail(data.email));
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Ошибка входа');
      }
    } catch (err) {
      setError(`Произошла ошибка Попробуйте снова. ${err}`);
    }
  };

  return (
    <div className="auth">
      <div className="auth-form">
        <div className="auth-form__left">
            <h1 className="auth-form__title">Вход</h1>
            <p className='auth-form__additional-text'>Для входа в систему административной панели отеля Arena&nbsp;Beach введите свои учетные данные.</p>
            <Image src="/svg/logo/logo.svg" alt="Логотип" width={120} height ={50} />
        </div>
        <div className='auth-form__right'>
          {error && <p className="auth-form__error">{error}</p>}
          <form onSubmit={handleSubmit} className="auth-form__container">
            <div className='auth-form__items'>
              <div className='auth-form__item auth-form__item--email'>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-form__input"
                  required
                  placeholder='Email'
                />
              </div>
              <div className='auth-form__item auth-form__item--password'>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-form__input"
                  required
                  placeholder='Пароль'
                />
              </div>
            </div>
            <button
              type="submit"
              className="auth-form__submit action-button"
            >
              Войти в аккаунт
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}