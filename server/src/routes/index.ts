// server/src/routes/index.ts
import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes';

const router = Router();

// Root route example
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to Firenze Check-In API!' });
});

// Mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
