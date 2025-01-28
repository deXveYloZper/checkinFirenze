// server/src/index.ts

import express, { Application, Request, Response, NextFunction } from 'express';
import { PORT } from './config';
import { initDB } from './config/db'; // <-- import DB init
import routes from './routes';

const app: Application = express();

// Connect to DB first
initDB().then(() => {
  console.log('Database initialized');
});

// Global middlewares
app.use(express.json());

// Routes
app.use('/', routes);


// Basic error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error handler:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
