// server/src/config/db.ts

import mongoose from 'mongoose';
import { MONGO_URI } from './index';

/**
 * Connect to MongoDB using mongoose.
 * Exports a function initDB() that we'll call from our main server.
 */
export async function initDB(): Promise<void> {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
}
