import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { TrendingUp, DollarSign, ShoppingCart, Users } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  const stats = [
    {
      label: 'Vendas de Hoje',
      value: 'R$ 2.450,00',
      icon: TrendingUp,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Lucro',
      value: 'R$ 850,00',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Produtos Vendidos',
      value: '42',
      icon: ShoppingCart,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Clientes',
      value: '128',
      icon: Users,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-bold">Bem-vindo, {user?.name}!</h1>
        <p className="text-blue-100 mt-2">Confira o desempenho de vendas de hoje</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <IconComponent size={24} />
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Vendas por Hora</h2>
          <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center text-gray-500">
            Gráfico de vendas (em desenvolvimento)
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Métodos de Pagamento</h2>
          <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center text-gray-500">
            Gráfico de pagamentos (em desenvolvimento)
          </div>
        </div>
      </div>
    </div>
  );
};
