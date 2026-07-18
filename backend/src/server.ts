import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';
import { PrismaClient } from '@prisma/client';
import apiRoutes from './routes/index';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api', apiRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const start = async () => {
  try {
    await prisma.$connect();
    console.log('✓ Database connected');
    
    app.listen(PORT, () => {
      console.log(`\n🚀 PDV Backend running on http://localhost:${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs\n`);
      console.log('Available endpoints:');
      console.log('  POST   /api/auth/login');
      console.log('  POST   /api/auth/register');
      console.log('  GET    /api/auth/me');
      console.log('  GET    /api/products');
      console.log('  GET    /api/products/search');
      console.log('  GET    /api/customers');
      console.log('  POST   /api/customers\n');
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error);
    process.exit(1);
  }
};

start();

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
