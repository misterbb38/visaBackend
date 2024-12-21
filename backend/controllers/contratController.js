// backend/controllers/contratController.js
const Contrat = require('../models/Contrat');

exports.createContrat = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Accès refusé' });
  try {
    const { type, prixTotal, prixAvance, delaisTraitement } = req.body;
    const contrat = await Contrat.create({ type, prixTotal, prixAvance, delaisTraitement });
    res.status(201).json(contrat);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la création du contrat' });
  }
};

exports.getAllContrats = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Accès refusé' });
  try {
    const contrats = await Contrat.find();
    res.json(contrats);
  } catch (error) {
    res.status(500).json({ error: 'Erreur interne' });
  }
};
