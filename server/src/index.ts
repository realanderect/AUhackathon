import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Debug logging middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[DEBUG] ${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('[DEBUG] Request Body:', req.body);
  next();
});

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/api/health', (_req: Request, res: Response) => {
  console.log('[DEBUG] Health check endpoint called');
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    routes: [
      '/api/auth/register',
      '/api/auth/login',
      '/api/auth/me'
    ]
  });
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[ERROR]', err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

// Handle 404 routes
app.use((_req: Request, res: Response) => {
  console.log('[DEBUG] 404 - Route not found');
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource does not exist',
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`[SERVER] Server is running on port ${port}`);
  console.log('[DEBUG] Available endpoints:');
  console.log('  - POST /api/auth/register');
  console.log('  - POST /api/auth/login');
  console.log('  - GET  /api/auth/me');
  console.log('  - GET  /api/health');
  console.log(`[DEBUG] Server URL: http://localhost:${port}`);
});
