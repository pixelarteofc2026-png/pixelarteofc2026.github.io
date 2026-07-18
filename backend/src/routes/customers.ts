import { Router, Request, Response } from 'express';
import { customerService } from '../services/customer.service';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// Search customers
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

    const result = await customerService.search(
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

// Get all customers
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not found',
      });
    }

    const { page = '1', limit = '20' } = req.query;

    const result = await customerService.findByCompany(
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

// Get customer by ID
router.get('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const customer = await customerService.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        error: 'Customer not found',
      });
    }

    res.json({
      success: true,
      data: customer,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Create customer
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not found',
      });
    }

    const customer = await customerService.create(req.user.companyId, req.body);

    res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Update customer
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const customer = await customerService.update(req.params.id, req.body);

    res.json({
      success: true,
      data: customer,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Delete customer
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    await customerService.delete(req.params.id);

    res.json({
      success: true,
      message: 'Customer deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
