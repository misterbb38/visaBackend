// backend/routes/contratRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  createContrat,
  getAllContrats,
  updateContrat,
  deleteContrat
} = require('../controllers/contratController');

// Admin : create, update, delete, get all
router.post('/', auth, createContrat);           // Création
router.get('/all',  getAllContrats);        // Lecture (liste)
router.put('/:contratId', auth, updateContrat);  // Mise à jour
router.delete('/:contratId', auth, deleteContrat); // Suppression

module.exports = router;
