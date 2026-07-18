import React from 'react';
import { Plus, Search, Eye, Edit2, Trash2, Phone, Mail, MapPin } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

export const ClientesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState<any>(null);

  const customers = [
    {
      id: '1',
      name: 'João Silva',
      cpf: '123.456.789-00',
      phone: '(11) 99999-9999',
      email: 'joao@example.com',
      address: 'Rua A, 123',
      city: 'São Paulo',
      state: 'SP',
      totalPurchases: 45,
      lastPurchase: '2024-07-15',
      loyaltyPoints: 450,
    },
    {
      id: '2',
      name: 'Maria Santos',
      cpf: '987.654.321-00',
      phone: '(11) 98888-8888',
      email: 'maria@example.com',
      address: 'Avenida B, 456',
      city: 'São Paulo',
      state: 'SP',
      totalPurchases: 32,
      lastPurchase: '2024-07-16',
      loyaltyPoints: 320,
    },
  ];

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cpf.includes(searchTerm) ||
      c.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600 mt-1">Gerencie seus clientes e histórico de compras</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Novo Cliente
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center gap-2">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, CPF ou telefone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border-none focus:outline-none"
          />
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{customer.name}</h3>
                <p className="text-sm text-gray-500">{customer.cpf}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Edit2 size={18} />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                <a href={`tel:${customer.phone}`} className="hover:text-blue-600">
                  {customer.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                <a href={`mailto:${customer.email}`} className="hover:text-blue-600">
                  {customer.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" />
                <span>{customer.address}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">Total de Compras</p>
                <p className="text-lg font-bold text-blue-600">{customer.totalPurchases}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">Pontos Fidelidade</p>
                <p className="text-lg font-bold text-green-600">{customer.loyaltyPoints}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
