const express = require('express');
const router = express.Router();
const { generateReport } = require('../controllers/reportController');
const auth = require('../middleware/authMiddleware');

// Route to get task summary report
router.get('/summary', auth, generateReport);

module.exports = router;
