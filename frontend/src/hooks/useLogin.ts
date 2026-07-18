import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { ILoginRequest } from '@/types';
import api from '@/services/api';

export const useLogin = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { setAuth } = useAuthStore();

  const login = async (credentials: ILoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', credentials);
      const { user, accessToken, refreshToken } = response.data.data;
      setAuth(user, accessToken, refreshToken);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
