import express from 'express';
import { generateReport } from '../controllers/reportController';
import auth from '../middleware/authMiddleware';

const router = express.Router();

router.get('/summary', auth, generateReport);

export default router;
