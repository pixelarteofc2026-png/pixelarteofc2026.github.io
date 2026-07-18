import { Router, Request, Response } from 'express';
import { userService } from '../services/user.service';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required',
      });
    }

    const result = await userService.login({ email, password });

    if (!result) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

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

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, name, password, companyId } = req.body;

    if (!email || !name || !password || !companyId) {
      return res.status(400).json({
        success: false,
        error: 'Email, name, password, and company ID are required',
      });
    }

    const existingUser = await userService.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'Email already in use',
      });
    }

    const user = await userService.create({
      email,
      name,
      password,
      companyId,
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get current user
router.get('/me', authenticateToken, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not found',
      });
    }

    const user = await userService.findById(req.user.userId);

    res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
