import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';
import { PrismaClient } from '@prisma/client';

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

// API Routes (to be implemented)
app.use('/api/auth', require('./routes/auth').default || require('./routes/auth'));

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Start server
const start = async () => {
  try {
    await prisma.$connect();
    console.log('✓ Database connected');
    
    app.listen(PORT, () => {
      console.log(`\n🚀 PDV Backend running on http://localhost:${PORT}\n`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs\n`);
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
