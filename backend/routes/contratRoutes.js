// backend/routes/contratRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createContrat, getAllContrats } = require('../controllers/contratController');

router.post('/', auth, createContrat);
router.get('/all', auth, getAllContrats);

module.exports = router;
