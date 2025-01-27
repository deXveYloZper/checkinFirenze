// src/index.ts

import express, { Application, Request, Response, NextFunction } from 'express';
import { PORT } from './config';
import routes from './routes';

const app: Application = express();

/*
  Middleware setup
*/
app.use(express.json()); 
// This allows us to parse JSON bodies in requests

/*
  Routes
*/
app.use('/', routes);

/*
  Basic error handling
  (You could move this to a dedicated middleware file later)
*/
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error handler:', err);
  res.status(500).json({ error: 'Internal server error' });
});

/*
  Start the server
*/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
