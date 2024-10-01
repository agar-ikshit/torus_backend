const express = require('express');
const { generateReport } = require('../controllers/reportController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/summary', auth, generateReport);


module.exports = router;
