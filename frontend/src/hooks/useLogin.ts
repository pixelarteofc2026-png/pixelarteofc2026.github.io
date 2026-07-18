import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { ILoginRequest } from '@/types';

export const useLogin = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { setAuth } = useAuthStore();

  const login = async (credentials: ILoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      // Simulação de login para demonstração
      if (credentials.email === 'admin@example.com' && credentials.password === 'password123') {
        const mockUser = {
          id: '1',
          companyId: '1',
          email: credentials.email,
          name: 'Administrador',
          role: 'ADMIN' as const,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        const mockToken = 'mock_jwt_token_' + Date.now();
        setAuth(mockUser, mockToken, 'refresh_token');
        return true;
      } else {
        setError('Email ou senha incorretos');
        return false;
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
