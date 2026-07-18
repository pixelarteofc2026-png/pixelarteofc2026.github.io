import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Package } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const salesData = [
  { date: 'Seg', sales: 4000, profit: 2400 },
  { date: 'Ter', sales: 3000, profit: 1398 },
  { date: 'Qua', sales: 2000, profit: 9800 },
  { date: 'Qui', sales: 2780, profit: 3908 },
  { date: 'Sex', sales: 1890, profit: 4800 },
  { date: 'Sab', sales: 2390, profit: 3800 },
  { date: 'Dom', sales: 3490, profit: 4300 },
];

const categoryData = [
  { name: 'Café', value: 400 },
  { name: 'Pães', value: 300 },
  { name: 'Bolos', value: 200 },
  { name: 'Sucos', value: 100 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export const RelatoriosPage: React.FC = () => {
  const reports = [
    {
      title: 'Vendas Totais',
      value: 'R$ 12.450,00',
      change: '+12.5%',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Lucro Total',
      value: 'R$ 4.850,00',
      change: '+8.2%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Produtos Vendidos',
      value: '342',
      change: '+5.1%',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Ticket Médio',
      value: 'R$ 36,36',
      change: '+2.3%',
      icon: BarChart3,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
        <p className="text-gray-600 mt-1">Análise de desempenho e vendas</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((report, index) => {
          const IconComponent = report.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`${report.bgColor} ${report.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <IconComponent size={24} />
                </div>
                <span className="text-green-600 text-sm font-semibold">{report.change}</span>
              </div>
              <p className="text-gray-600 text-sm">{report.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{report.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Vendas por Dia</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3B82F6" name="Vendas" />
              <Line type="monotone" dataKey="profit" stroke="#10B981" name="Lucro" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Vendas por Categoria</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Produtos Mais Vendidos</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Produto</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Quantidade</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Total</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Lucro</th>
            </tr>
          </thead>
          <tbody>
            {[
              { product: 'Café Premium', quantity: 125, total: 'R$ 1.937,50', profit: 'R$ 625,00' },
              { product: 'Pão Francês', quantity: 98, total: 'R$ 784,00', profit: 'R$ 196,00' },
              { product: 'Bolo de Chocolate', quantity: 42, total: 'R$ 1.470,00', profit: 'R$ 840,00' },
              { product: 'Suco Natural', quantity: 77, total: 'R$ 924,00', profit: 'R$ 539,00' },
            ].map((item, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.product}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.quantity}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.total}</td>
                <td className="px-6 py-4 text-sm text-green-600 font-medium">{item.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
