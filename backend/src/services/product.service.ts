import { PrismaClient } from '@prisma/client';
import { IProduct, IProductInput, IPaginatedResponse } from '../types';

const prisma = new PrismaClient();

export const productService = {
  // Create product
  create: async (companyId: string, data: IProductInput): Promise<IProduct> => {
    return await prisma.product.create({
      data: {
        companyId,
        ...data,
        costPrice: parseFloat(data.costPrice.toString()),
        sellPrice: parseFloat(data.sellPrice.toString()),
        wholesalePrice: data.wholesalePrice ? parseFloat(data.wholesalePrice.toString()) : undefined,
        promotionPrice: data.promotionPrice ? parseFloat(data.promotionPrice.toString()) : undefined,
      },
    });
  },

  // Find product by ID
  findById: async (id: string): Promise<IProduct | null> => {
    return await prisma.product.findUnique({
      where: { id },
    });
  },

  // Find by barcode
  findByBarcode: async (barcode: string): Promise<IProduct | null> => {
    return await prisma.product.findUnique({
      where: { barcode },
    });
  },

  // Search products
  search: async (
    companyId: string,
    query: string,
    page: number = 1,
    limit: number = 20
  ): Promise<IPaginatedResponse<IProduct>> => {
    const skip = (page - 1) * limit;

    const where = {
      companyId,
      active: true,
      OR: [
        { name: { contains: query, mode: 'insensitive' as const } },
        { barcode: { contains: query, mode: 'insensitive' as const } },
        { sku: { contains: query, mode: 'insensitive' as const } },
      ],
    };

    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  },

  // Get all products by company
  findByCompany: async (
    companyId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<IPaginatedResponse<IProduct>> => {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where: { companyId, active: true },
        skip,
        take: limit,
      }),
      prisma.product.count({ where: { companyId, active: true } }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  },

  // Update product
  update: async (id: string, data: Partial<IProductInput>): Promise<IProduct> => {
    return await prisma.product.update({
      where: { id },
      data,
    });
  },

  // Delete product
  delete: async (id: string): Promise<void> => {
    await prisma.product.update({
      where: { id },
      data: { active: false },
    });
  },

  // Get low stock products
  getLowStock: async (companyId: string): Promise<IProduct[]> => {
    return await prisma.product.findMany({
      where: {
        companyId,
        active: true,
        stock: {
          lte: prisma.product.fields.minimumStock,
        },
      },
    });
  },
};
