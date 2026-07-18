import { Router, Request, Response } from 'express';
import { productService } from '../services/product.service';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// Search products
router.get('/search', authenticateToken, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not found',
      });
    }

    const { q, page = '1', limit = '20' } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required',
      });
    }

    const result = await productService.search(
      req.user.companyId,
      q as string,
      parseInt(page as string),
      parseInt(limit as string)
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Find by barcode
router.get('/barcode/:barcode', authenticateToken, async (req: Request, res: Response) => {
  try {
    const product = await productService.findByBarcode(req.params.barcode);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get all products
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not found',
      });
    }

    const { page = '1', limit = '20' } = req.query;

    const result = await productService.findByCompany(
      req.user.companyId,
      parseInt(page as string),
      parseInt(limit as string)
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get product by ID
router.get('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const product = await productService.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Create product
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not found',
      });
    }

    const product = await productService.create(req.user.companyId, req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Update product
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const product = await productService.update(req.params.id, req.body);

    res.json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Delete product
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    await productService.delete(req.params.id);

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
