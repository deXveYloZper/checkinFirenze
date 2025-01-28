// server/src/routes/auth.routes.ts

import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';
import { JWT_SECRET } from '../config';

const router = Router();

/**
 * @route   POST /register
 * @desc    Register a new user (Owner or Agent)
 * @access  Public
 */
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use.' });
    }

    // Validate role
    if (!['owner', 'agent'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role specified.' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save new user
    const newUser = new User({
      email,
      password: hashedPassword,
      role
    });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Register Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route   POST /login
 * @desc    Login user (Owner or Agent) and return JWT
 * @access  Public
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Create JWT payload
    const payload = {
      id: user._id,
      role: user.role
    };

    // Sign token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      message: 'Login successful.',
      token
    });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
