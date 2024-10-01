import express from 'express';
import connectDB from '../config/db.js';
import cors from 'cors';
import morgan from 'morgan';
import reportRoutes from './reportRoutes.js';
import authRoutes from './authRoutes.js';
import taskRoutes from './taskRoutes.js';


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev')); // Optional: Logs HTTP requests

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/reports', reportRoutes);

// Export the app
export default app;
