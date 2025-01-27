// src/config/index.ts

import dotenv from 'dotenv';
dotenv.config();

/*
  This file ensures .env is read as early as possible,
  then we can export environment variables or other config logic
*/

// Export environment variables
export const PORT = process.env.PORT || '3000';
