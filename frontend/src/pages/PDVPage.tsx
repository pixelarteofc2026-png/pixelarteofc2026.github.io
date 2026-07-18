import React from 'react';
import { Search, Barcode, Plus, Trash2, Copy, AlertCircle } from 'lucide-react';
import { IProduct } from '@/types';

interface CartItem extends IProduct {
  quantityInCart: number;
  discount: number;
  notes?: string;
}

export const PDVPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = React.useState<any>(null);
  const [showCustomerModal, setShowCustomerModal] = React.useState(false);
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);

  // Mock products
  const allProducts: IProduct[] = [
    { id: '1', name: 'Café Premium', barcode: '123456789', sku: 'CAF-001', costPrice: 5, sellPrice: 15.50, stock: 45 },
    { id: '2', name: 'Pão Francês', barcode: '987654321', sku: 'PAO-001', costPrice: 2, sellPrice: 8.00, stock: 120 },
    { id: '3', name: 'Bolo de Chocolate', barcode: '555666777', sku: 'BOL-001', costPrice: 15, sellPrice: 35.00, stock: 12 },
    { id: '4', name: 'Suco Natural', barcode: '444333222', sku: 'SUC-001', costPrice: 3, sellPrice: 12.00, stock: 80 },
    { id: '5', name: 'Croissant', barcode: '111222333', sku: 'CRO-001', costPrice: 3.50, sellPrice: 10.00, stock: 55 },
  ];

  const filteredProducts = allProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.barcode?.includes(searchTerm) ||
    p.sku?.includes(searchTerm)
  );

  // Add to cart
  const addToCart = (product: IProduct) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantityInCart: item.quantityInCart + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantityInCart: 1, discount: 0 }]);
    }
    setSearchTerm('');
  };

  // Remove from cart
  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantityInCart: quantity } : item
      )
    );
  };

  // Duplicate item
  const duplicateItem = (productId: string) => {
    const item = cartItems.find((i) => i.id === productId);
    if (item) {
      setCartItems([...cartItems, { ...item, quantityInCart: item.quantityInCart }]);
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.sellPrice * item.quantityInCart, 0);
  const totalDiscount = cartItems.reduce((sum, item) => sum + item.discount * item.quantityInCart, 0);
  const total = subtotal - totalDiscount;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-screen overflow-hidden pb-6">
      {/* Left: Products */}
      <div className="lg:col-span-2 flex flex-col gap-4 overflow-hidden">
        {/* Search */}
        <div className="bg-white rounded-lg shadow-md p-4 flex gap-2">
          <div className="flex-1 flex items-center gap-2 border border-gray-300 rounded-lg px-4">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome, código ou barras..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 py-2 border-none focus:outline-none"
              autoFocus
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100">
            <Barcode size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="bg-white rounded-lg shadow-md flex-1 overflow-auto p-4">
          {searchTerm ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all text-left"
                >
                  <div className="w-full h-24 bg-gray-100 rounded-lg mb-2 flex items-center justify-center text-gray-400 text-sm">
                    Imagem
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900">{product.name}</h3>
                  <p className="text-gray-500 text-xs mt-1">{product.sku}</p>
                  <p className="text-blue-600 font-bold text-lg mt-2">R$ {product.sellPrice.toFixed(2)}</p>
                  <p className="text-gray-500 text-xs mt-1">Estoque: {product.stock}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 text-center">
              <div>
                <Barcode size={48} className="mx-auto mb-4 opacity-50" />
                <p>Digite para buscar produtos</p>
                <p className="text-sm mt-2">Ou escaneie um código de barras</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Cart */}
      <div className="lg:col-span-1 flex flex-col gap-4 overflow-hidden">
        {/* Customer Info */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Cliente</p>
          {selectedCustomer ? (
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-900">{selectedCustomer.name}</p>
                <p className="text-xs text-gray-500">{selectedCustomer.cpf}</p>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-red-600 hover:bg-red-50 p-2 rounded"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowCustomerModal(true)}
              className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all"
            >
              + Adicionar Cliente
            </button>
          )}
        </div>

        {/* Cart Items */}
        <div className="bg-white rounded-lg shadow-md flex-1 overflow-auto">
          <div className="p-4 border-b border-gray-200">
            <p className="text-xs text-gray-500 uppercase font-semibold">Carrinho ({cartItems.length})</p>
          </div>
          <div className="p-4 space-y-3 overflow-auto">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 text-sm py-8">Carrinho vazio</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900">{item.name}</h4>
                      <p className="text-xs text-gray-500">R$ {item.sellPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => duplicateItem(item.id)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Duplicar item"
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantityInCart - 1)}
                      className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={item.quantityInCart}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                      className="w-12 text-center border border-gray-300 rounded py-1 text-sm"
                      min="1"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantityInCart + 1)}
                      className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Desconto"
                      value={item.discount || 0}
                      onChange={(e) =>
                        setCartItems(
                          cartItems.map((i) =>
                            i.id === item.id ? { ...i, discount: parseFloat(e.target.value) || 0 } : i
                          )
                        )
                      }
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <span className="font-semibold text-blue-600">R$ {(item.sellPrice * item.quantityInCart - item.discount * item.quantityInCart).toFixed(2)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Totals */}
        <div className="bg-gradient-to-br from-blue-600 to-green-600 text-white rounded-lg shadow-md p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Desconto:</span>
            <span>-R$ {totalDiscount.toFixed(2)}</span>
          </div>
          <div className="border-t border-white/30 pt-2 flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={() => setShowPaymentModal(true)}
          disabled={cartItems.length === 0}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
        >
          Finalizar Venda
        </button>
      </div>

      {/* Modals */}
      {showCustomerModal && (
        <CustomerModal
          onClose={() => setShowCustomerModal(false)}
          onSelect={(customer) => {
            setSelectedCustomer(customer);
            setShowCustomerModal(false);
          }}
        />
      )}

      {showPaymentModal && (
        <PaymentModal
          total={total}
          onClose={() => setShowPaymentModal(false)}
          onComplete={() => {
            setCartItems([]);
            setShowPaymentModal(false);
            setSelectedCustomer(null);
          }}
        />
      )}
    </div>
  );
};

// Customer Modal
interface CustomerModalProps {
  onClose: () => void;
  onSelect: (customer: any) => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({ onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const customers = [
    { id: '1', name: 'João Silva', cpf: '123.456.789-00' },
    { id: '2', name: 'Maria Santos', cpf: '987.654.321-00' },
    { id: '3', name: 'Pedro Oliveira', cpf: '456.789.123-00' },
  ];

  const filtered = customers.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Selecionar Cliente</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ✕
          </button>
        </div>

        <input
          type="text"
          placeholder="Buscar cliente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          autoFocus
        />

        <div className="space-y-2 max-h-64 overflow-auto">
          {filtered.map((customer) => (
            <button
              key={customer.id}
              onClick={() => onSelect(customer)}
              className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-all"
            >
              <p className="font-semibold text-gray-900">{customer.name}</p>
              <p className="text-sm text-gray-500">{customer.cpf}</p>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

// Payment Modal
interface PaymentModalProps {
  total: number;
  onClose: () => void;
  onComplete: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ total, onClose, onComplete }) => {
  const [paymentMethod, setPaymentMethod] = React.useState<'cash' | 'pix' | 'card'>('cash');
  const [amountReceived, setAmountReceived] = React.useState(total);
  const [installments, setInstallments] = React.useState(1);

  const change = paymentMethod === 'cash' ? amountReceived - total : 0;

  const paymentMethods = [
    { id: 'cash', label: 'Dinheiro', icon: '💵' },
    { id: 'pix', label: 'PIX', icon: '📱' },
    { id: 'card', label: 'Cartão', icon: '💳' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">Pagamento</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ✕
          </button>
        </div>

        {/* Total */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-center">
          <p className="text-sm text-gray-600 mb-1">Valor Total</p>
          <p className="text-3xl font-bold text-blue-600">R$ {total.toFixed(2)}</p>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setPaymentMethod(method.id as any)}
              className={`p-3 rounded-lg border-2 transition-all text-center ${
                paymentMethod === method.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-1">{method.icon}</div>
              <p className="text-xs font-semibold text-gray-700">{method.label}</p>
            </button>
          ))}
        </div>

        {/* Cash Input */}
        {paymentMethod === 'cash' && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Valor Recebido</label>
              <input
                type="number"
                value={amountReceived}
                onChange={(e) => setAmountReceived(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Troco</p>
              <p className={`text-2xl font-bold ${
                change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                R$ {Math.abs(change).toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {/* Card Installments */}
        {paymentMethod === 'card' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Parcelamento</label>
            <select
              value={installments}
              onChange={(e) => setInstallments(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 6, 12].map((n) => (
                <option key={n} value={n}>
                  {n}x R$ {(total / n).toFixed(2)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={onComplete}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
