import express from 'express';
import authRoutes from './auth';
import productRoutes from './products';
import customerRoutes from './customers';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/customers', customerRoutes);

export default router;
