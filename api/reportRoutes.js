const express = require('express');
const router = express.Router();
const { generateReport } = require('../controllers/reportController');
const auth = require('../middleware/authMiddleware');
import connectDB from '../../config/db';
// Route to get task summary report


export default async function handler(req, res) {
    await connectDB();
router.get('/summary', auth, generateReport);

module.exports = router;
}