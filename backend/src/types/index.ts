// User Types
export interface IUser {
  id: string;
  companyId: string;
  email: string;
  name: string;
  role: UserRole;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserInput {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
  companyId: string;
}

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'CASHIER' | 'EMPLOYEE';

// Authentication Types
export interface IAuthPayload {
  userId: string;
  email: string;
  role: UserRole;
  companyId: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

// Company Types
export interface ICompany {
  id: string;
  name: string;
  document?: string;
  phone?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICompanyInput {
  name: string;
  document?: string;
  phone?: string;
  email?: string;
}

// Customer Types
export interface ICustomer {
  id: string;
  companyId: string;
  name: string;
  cpf?: string;
  cnpj?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICustomerInput {
  name: string;
  cpf?: string;
  cnpj?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

// Product Types
export interface IProduct {
  id: string;
  companyId: string;
  categoryId?: string;
  supplierId?: string;
  name: string;
  description?: string;
  barcode?: string;
  sku?: string;
  image?: string;
  costPrice: number;
  sellPrice: number;
  wholesalePrice?: number;
  promotionPrice?: number;
  stock: number;
  minimumStock: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductInput {
  categoryId?: string;
  supplierId?: string;
  name: string;
  description?: string;
  barcode?: string;
  sku?: string;
  image?: string;
  costPrice: number;
  sellPrice: number;
  wholesalePrice?: number;
  promotionPrice?: number;
  stock?: number;
  minimumStock?: number;
}

// Sale Types
export type SaleStatus = 'OPEN' | 'PAID' | 'CANCELLED' | 'REFUNDED';

export interface ISaleItem {
  id: string;
  saleId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  subtotal: number;
  total: number;
}

export interface ISale {
  id: string;
  companyId: string;
  customerId?: string;
  cashierId: string;
  status: SaleStatus;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paid: number;
  change: number;
  items: ISaleItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ISaleInput {
  customerId?: string;
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
    discount?: number;
  }>;
  discount?: number;
  notes?: string;
}

// Payment Types
export type PaymentMethod = 'CASH' | 'PIX' | 'DEBIT_CARD' | 'CREDIT_CARD' | 'VOUCHER' | 'CREDIT' | 'TRANSFER';
export type PaymentStatus = 'PENDING' | 'CONFIRMED' | 'FAILED' | 'REFUNDED';

export interface IPayment {
  id: string;
  saleId: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  installments?: number;
  reference?: string;
  authCode?: string;
  confirmedAt?: Date;
}

export interface IPaymentInput {
  method: PaymentMethod;
  amount: number;
  installments?: number;
}

// Category Types
export interface ICategory {
  id: string;
  companyId: string;
  name: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryInput {
  name: string;
  image?: string;
}

// Supplier Types
export interface ISupplier {
  id: string;
  companyId: string;
  name: string;
  cnpj?: string;
  phone?: string;
  email?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISupplierInput {
  name: string;
  cnpj?: string;
  phone?: string;
  email?: string;
  website?: string;
}

// Pagination
export interface IPaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export interface IPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// Error Response
export interface IErrorResponse {
  error: string;
  message: string;
  status: number;
  details?: any;
}

// API Response
export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
