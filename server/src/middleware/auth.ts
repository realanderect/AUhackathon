import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // In production, use environment variable

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

export const generateToken = (userId: number, email: string): string => {
  console.log(`[DEBUG] Generating token for user: ${email}`);
  return jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: '24h' });
};

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  console.log('[DEBUG] Authenticating token');

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    console.log('[DEBUG] No token provided');
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number | string; email: string };
    console.log(`[DEBUG] Token verified for user: ${decoded.email}`);
    req.user = {
      id: typeof decoded.id === 'string' ? parseInt(decoded.id, 10) : decoded.id,
      email: decoded.email
    };
    next();
  } catch (error) {
    console.error('[ERROR] Token verification failed:', error);
    return res.status(403).json({ error: 'Invalid token' });
  }
};
