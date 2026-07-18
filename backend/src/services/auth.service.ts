import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { IAuthPayload } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '24h';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret';
const REFRESH_TOKEN_EXPIRE = process.env.REFRESH_TOKEN_EXPIRE || '7d';

export const authService = {
  // Generate JWT access token
  generateAccessToken: (payload: IAuthPayload): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
  },

  // Generate refresh token
  generateRefreshToken: (userId: string): string => {
    return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRE });
  },

  // Verify access token
  verifyAccessToken: (token: string): IAuthPayload | null => {
    try {
      return jwt.verify(token, JWT_SECRET) as IAuthPayload;
    } catch (error) {
      return null;
    }
  },

  // Verify refresh token
  verifyRefreshToken: (token: string): { userId: string } | null => {
    try {
      return jwt.verify(token, REFRESH_TOKEN_SECRET) as { userId: string };
    } catch (error) {
      return null;
    }
  },

  // Hash password
  hashPassword: async (password: string): Promise<string> => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
  },

  // Compare password
  comparePassword: async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcryptjs.compare(password, hashedPassword);
  },
};
