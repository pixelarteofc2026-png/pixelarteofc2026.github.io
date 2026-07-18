import { PrismaClient } from '@prisma/client';
import { ICustomer, ICustomerInput, IPaginatedResponse } from '../types';

const prisma = new PrismaClient();

export const customerService = {
  // Create customer
  create: async (companyId: string, data: ICustomerInput): Promise<ICustomer> => {
    return await prisma.customer.create({
      data: {
        companyId,
        ...data,
      },
    });
  },

  // Find customer by ID
  findById: async (id: string): Promise<ICustomer | null> => {
    return await prisma.customer.findUnique({
      where: { id },
    });
  },

  // Search customers
  search: async (
    companyId: string,
    query: string,
    page: number = 1,
    limit: number = 20
  ): Promise<IPaginatedResponse<ICustomer>> => {
    const skip = (page - 1) * limit;

    const where = {
      companyId,
      OR: [
        { name: { contains: query, mode: 'insensitive' as const } },
        { cpf: { contains: query, mode: 'insensitive' as const } },
        { cnpj: { contains: query, mode: 'insensitive' as const } },
        { email: { contains: query, mode: 'insensitive' as const } },
        { phone: { contains: query, mode: 'insensitive' as const } },
      ],
    };

    const [data, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        skip,
        take: limit,
      }),
      prisma.customer.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  },

  // Get all customers by company
  findByCompany: async (
    companyId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<IPaginatedResponse<ICustomer>> => {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.customer.findMany({
        where: { companyId },
        skip,
        take: limit,
      }),
      prisma.customer.count({ where: { companyId } }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  },

  // Update customer
  update: async (id: string, data: Partial<ICustomerInput>): Promise<ICustomer> => {
    return await prisma.customer.update({
      where: { id },
      data,
    });
  },

  // Delete customer
  delete: async (id: string): Promise<void> => {
    await prisma.customer.delete({
      where: { id },
    });
  },
};
