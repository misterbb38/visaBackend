// backend/routes/procedureRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createProcedure, updateProcedureEtape, getProceduresByClient, getAllProcedures } = require('../controllers/procedureController');

// Admin
router.post('/', auth, createProcedure);
router.put('/:procedureId', auth, updateProcedureEtape);
router.get('/all', auth, getAllProcedures);

// Client
router.get('/', auth, getProceduresByClient);

module.exports = router;
