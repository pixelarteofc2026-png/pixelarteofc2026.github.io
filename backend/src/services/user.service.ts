import { PrismaClient } from '@prisma/client';
import { IUser, IUserInput, IAuthResponse, ILoginRequest } from '../types';
import { authService } from './auth.service';

const prisma = new PrismaClient();

export const userService = {
  // Create new user
  create: async (data: IUserInput): Promise<IUser> => {
    const hashedPassword = await authService.hashPassword(data.password);
    
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        role: data.role || 'EMPLOYEE',
        companyId: data.companyId,
      },
    });

    return user;
  },

  // Find user by email
  findByEmail: async (email: string): Promise<IUser | null> => {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  // Find user by ID
  findById: async (id: string): Promise<IUser | null> => {
    return await prisma.user.findUnique({
      where: { id },
    });
  },

  // Get all users by company
  findByCompany: async (companyId: string): Promise<IUser[]> => {
    return await prisma.user.findMany({
      where: { companyId },
    });
  },

  // Update user
  update: async (id: string, data: Partial<IUserInput>): Promise<IUser> => {
    const updateData: any = { ...data };
    
    if (data.password) {
      updateData.password = await authService.hashPassword(data.password);
    }

    return await prisma.user.update({
      where: { id },
      data: updateData,
    });
  },

  // Delete user
  delete: async (id: string): Promise<void> => {
    await prisma.user.delete({
      where: { id },
    });
  },

  // Login user
  login: async (credentials: ILoginRequest): Promise<IAuthResponse | null> => {
    const user = await userService.findByEmail(credentials.email);

    if (!user) return null;

    const isPasswordValid = await authService.comparePassword(
      credentials.password,
      user.password
    );

    if (!isPasswordValid) return null;

    const accessToken = authService.generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role as any,
      companyId: user.companyId,
    });

    const refreshToken = authService.generateRefreshToken(user.id);

    return {
      user,
      accessToken,
      refreshToken,
    };
  },
};
