// User Types
export interface IUser {
  id: string;
  companyId: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'CASHIER' | 'EMPLOYEE';
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IProduct {
  id: string;
  name: string;
  barcode?: string;
  sku?: string;
  costPrice: number;
  sellPrice: number;
  stock: number;
}

export interface ICustomer {
  id: string;
  name: string;
  cpf?: string;
  email?: string;
  phone?: string;
}

export interface ISale {
  id: string;
  total: number;
  discount: number;
  items: ISaleItem[];
  createdAt: Date;
}

export interface ISaleItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}
