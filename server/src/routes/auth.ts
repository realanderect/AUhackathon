import { Router, Request, Response, NextFunction } from 'express';
import { UserModel, loginSchema, registerSchema } from '../models/user';
import { generateToken, authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

// Register endpoint
router.post('/register', (req: Request, res: Response, next: NextFunction) => {
  console.log('[DEBUG] Register request received:', req.body);

  registerHandler()
    .catch(next);

  async function registerHandler() {
    try {
      // Validate request body
      const validatedData = registerSchema.parse(req.body);
      console.log('[DEBUG] Register data validated');

      // Create user
      const user = await UserModel.create(validatedData);
      console.log(`[DEBUG] User created with ID: ${user.id}`);

      // Generate token
      const token = generateToken(user.id, user.email);

      // Return user data (excluding password) and token
      const { password, ...userWithoutPassword } = user;
      res.status(201).json({
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      console.error('[ERROR] Registration failed:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
});

// Login endpoint
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  console.log('[DEBUG] Login request received:', req.body);

  loginHandler()
    .catch(next);

  async function loginHandler() {
    try {
      // Validate request body
      const validatedData = loginSchema.parse(req.body);
      console.log('[DEBUG] Login data validated');

      // Find user
      const user = await UserModel.findByEmail(validatedData.email);
      if (!user) {
        console.log('[DEBUG] User not found');
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      // Verify password
      const isValidPassword = await UserModel.verifyPassword(
        user,
        validatedData.password
      );
      if (!isValidPassword) {
        console.log('[DEBUG] Invalid password');
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      console.log(`[DEBUG] User ${user.email} logged in successfully`);

      // Generate token
      const token = generateToken(user.id, user.email);

      // Return user data (excluding password) and token
      const { password, ...userWithoutPassword } = user;
      res.json({
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      console.error('[ERROR] Login failed:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
});

// Get current user endpoint
router.get('/me', authenticateToken, (req: AuthRequest, res: Response, next: NextFunction) => {
  console.log('[DEBUG] Get current user request');

  getCurrentUser()
    .catch(next);

  async function getCurrentUser() {
    try {
      if (!req.user) {
        console.log('[DEBUG] No user in request');
        res.status(401).json({ error: 'Authentication required' });
        return;
      }

      const user = await UserModel.findById(req.user.id);
      if (!user) {
        console.log('[DEBUG] User not found');
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({ user });
    } catch (error) {
      console.error('[ERROR] Get current user failed:', error);
      next(error);
    }
  }
});

export default router;
