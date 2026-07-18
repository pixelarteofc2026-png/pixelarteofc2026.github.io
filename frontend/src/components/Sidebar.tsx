import React from 'react';
import { LayoutGrid, Package, Users, ShoppingCart, BarChart3, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  roles: string[];
}

const sidebarItems: SidebarItem[] = [
  { label: 'Dashboard', icon: <LayoutGrid size={20} />, href: '/dashboard', roles: ['ADMIN', 'MANAGER', 'CASHIER'] },
  { label: 'PDV', icon: <ShoppingCart size={20} />, href: '/pdv', roles: ['CASHIER', 'ADMIN', 'MANAGER'] },
  { label: 'Produtos', icon: <Package size={20} />, href: '/produtos', roles: ['ADMIN', 'MANAGER'] },
  { label: 'Clientes', icon: <Users size={20} />, href: '/clientes', roles: ['ADMIN', 'MANAGER', 'CASHIER'] },
  { label: 'Relatórios', icon: <BarChart3 size={20} />, href: '/relatorios', roles: ['ADMIN', 'MANAGER'] },
  { label: 'Configurações', icon: <Settings size={20} />, href: '/configuracoes', roles: ['ADMIN'] },
];

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const visibleItems = sidebarItems.filter(item => item.roles.includes(user?.role || ''));

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <aside className={`${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 fixed md:relative w-64 h-screen bg-gray-900 text-white transition-transform duration-300 z-40 flex flex-col`}>
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold">PDV System</h1>
          <p className="text-gray-400 text-sm mt-1">{user?.role}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {visibleItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                location.pathname === item.href
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-gray-800 p-4">
          <button
            onClick={() => {
              logout();
              setMobileOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-red-400 transition-all"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
};
