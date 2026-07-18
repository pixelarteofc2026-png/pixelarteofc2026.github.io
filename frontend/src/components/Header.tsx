import React from 'react';
import { LogOut, Settings, Menu } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">
          PDV <span className="text-green-600">System</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <span className="text-gray-600">Olá, {user?.name}</span>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Settings size={20} className="text-gray-600" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-red-50 rounded-lg"
            >
              <LogOut size={20} className="text-red-600" />
            </button>
          </div>
        </div>

        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 p-4 flex flex-col gap-4">
          <span className="text-gray-600">Olá, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            Sair
          </button>
        </div>
      )}
    </header>
  );
};
