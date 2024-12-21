// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { getAllUsers } = require('../controllers/userController');

router.get('/all', auth, getAllUsers);

module.exports = router;
