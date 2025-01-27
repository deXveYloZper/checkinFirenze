// src/routes/index.ts
import { Router, Request, Response } from 'express';

const router = Router();

/*
  Sample route to verify the server is running
*/
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to Firenze Check-In API!' });
});

export default router;
