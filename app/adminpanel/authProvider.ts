import type { AuthProvider } from "react-admin";

interface LoginParams {
  username: string;
  password: string;
}

export const authProvider: AuthProvider = {
  login: async ({ username, password }: LoginParams) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password }),
    });

    if (!res.ok) {
      throw new Error('Неверный логин или пароль');
    }

    return Promise.resolve();
  },

  logout: async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    return Promise.resolve();
  },

  checkError: (error: { status?: number }) => {
    if (error.status === 401 || error.status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkAuth: async () => {
    const res = await fetch('/api/auth/me', {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      return Promise.reject();
    }

    return Promise.resolve();
  },

  getPermissions: () => Promise.resolve(),
};
