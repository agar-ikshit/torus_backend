import express from 'express';
import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = Router();
// @route   POST /api/auth/register
// @desc    Register a new user
router.post(
  '/register',
  [
    
    check('username', 'Name is required').notEmpty(),
    check('email', 'Include a valid email').isEmail(),
    check('password', 'Minimum 6 characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract data
    const { username, email, password,isAdmin } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({ username, email, password, isAdmin });
      const salt = await bcrypt.genSalt(10); // Generate a salt
      user.password = await bcrypt.hash(password, salt); 
      await user.save();

      // Generate JWT
      const payload = { userId: user._id, email: user.email,isAdmin:user.isAdmin };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token, email: user.email });
    } catch (err) {
      console.error('Error in registration:', err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST /api/auth/login
// @desc    Login user
router.post(
  '/login',
  [
    check('email', 'Include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Generate JWT
      const payload = { userId: user._id, email: user.email, isAdmin:user.isAdmin };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token, email: user.email,isAdmin:user.isAdmin });
    } catch (err) {
      console.error('Error in login:', err.message);
      res.status(500).send('Server error');
    }
  }
);


export default router;
