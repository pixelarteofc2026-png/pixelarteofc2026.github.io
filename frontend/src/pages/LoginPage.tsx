import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '@/hooks/useLogin';
import { AlertCircle, Loader } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState('admin@example.com');
  const [password, setPassword] = React.useState('password123');
  const [localError, setLocalError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { login } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLocalError(null);
    
    try {
      const success = await login({ email, password });
      if (success) {
        navigate('/dashboard');
      } else {
        setLocalError('Email ou senha inválidos');
      }
    } catch (error) {
      setLocalError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-blue-600">PDV</span>{' '}
            <span className="text-green-600">System</span>
          </h1>
          <p className="text-gray-600">Sistema de Ponto de Venda Profissional</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {localError && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              <AlertCircle size={20} />
              <span>{localError}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? (
              <>
                <Loader size={18} className="animate-spin" />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        {/* Demo info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600 mb-3">Demonstração Online</p>
          <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-700 space-y-2">
            <p><strong>Email:</strong></p>
            <p className="font-mono bg-white p-2 rounded">admin@example.com</p>
            <p className="mt-3"><strong>Senha:</strong></p>
            <p className="font-mono bg-white p-2 rounded">password123</p>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800">
          <p><strong>⚠️ Nota:</strong> Esta é uma versão de demonstração com dados simulados.</p>
        </div>
      </div>
    </div>
  );
};
