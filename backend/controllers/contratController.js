// // backend/controllers/contratController.js
// const Contrat = require('../models/Contrat');

// exports.createContrat = async (req, res) => {
//   if (req.user.role !== 'admin') return res.status(403).json({ error: 'Accès refusé' });
//   try {
//     const { type, prixTotal, prixAvance, delaisTraitement } = req.body;
//     const contrat = await Contrat.create({ type, prixTotal, prixAvance, delaisTraitement });
//     res.status(201).json(contrat);
//   } catch (error) {
//     res.status(400).json({ error: 'Erreur lors de la création du contrat' });
//   }
// };

// exports.getAllContrats = async (req, res) => {
//   if (req.user.role !== 'admin') return res.status(403).json({ error: 'Accès refusé' });
//   try {
//     const contrats = await Contrat.find();
//     res.json(contrats);
//   } catch (error) {
//     res.status(500).json({ error: 'Erreur interne' });
//   }
// };



// backend/controllers/contratController.js
const Contrat = require('../models/Contrat');

exports.createContrat = async (req, res) => {
  // Seul un admin peut créer
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Accès refusé' });
  }
  try {
    const { nom, type, prixTotal, prixAvance, delaisTraitement } = req.body;
    // Création
    const contrat = await Contrat.create({
      nom,
      type,
      prixTotal,
      prixAvance,
      delaisTraitement
    });
    res.status(201).json(contrat);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la création du contrat' });
  }
};

exports.getAllContrats = async (req, res) => {
  // Seul un admin peut afficher tous les contrats
  // if (req.user.role !== 'admin') {
  //   return res.status(403).json({ error: 'Accès refusé' });
  // }
  try {
    const contrats = await Contrat.find();
    res.json(contrats);
  } catch (error) {
    res.status(500).json({ error: 'Erreur interne' });
  }
};

// Mise à jour d'un contrat
exports.updateContrat = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Accès refusé' });
  }
  try {
    const { contratId } = req.params; // On récupère l'ID du contrat dans l'URL
    const { nom, type, prixTotal, prixAvance, delaisTraitement } = req.body;

    // Trouver et mettre à jour
    const contrat = await Contrat.findByIdAndUpdate(
      contratId,
      { nom, type, prixTotal, prixAvance, delaisTraitement },
      { new: true } // retourne le document après la mise à jour
    );
    if (!contrat) {
      return res.status(404).json({ error: 'Contrat introuvable' });
    }
    res.json(contrat);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la mise à jour du contrat' });
  }
};

// Suppression d'un contrat
exports.deleteContrat = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Accès refusé' });
  }
  try {
    const { contratId } = req.params;
    const contrat = await Contrat.findByIdAndDelete(contratId);
    if (!contrat) {
      return res.status(404).json({ error: 'Contrat introuvable' });
    }
    res.json({ message: 'Contrat supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du contrat' });
  }
};



