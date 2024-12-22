// backend/controllers/procedureController.js
const Procedure = require('../models/Procedure');
const Contrat = require('../models/Contrat');
const User = require('../models/User');

exports.createProcedure = async (req, res) => {
  // Seul un admin peut créer une procédure
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Accès refusé' });
  try {
    const { clientId, contratId } = req.body;
    const client = await User.findById(clientId);
    if (!client || client.role !== 'client') return res.status(404).json({ error: 'Client introuvable' });

    const contrat = await Contrat.findById(contratId);
    if (!contrat) return res.status(404).json({ error: 'Contrat introuvable' });

    const etapes = Procedure.getEtapes(contrat.type);
    const etapeInitiale = etapes[0];

    const procedure = await Procedure.create({
      client: clientId,
      contrat: contratId,
      type: contrat.type,
      etapeCourante: etapeInitiale,
      historique: [{ etape: etapeInitiale, date: new Date() }]
    });

    res.status(201).json(procedure);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la création de la procédure' });
  }
};

exports.updateProcedureEtape = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Accès refusé' });
  try {
    const { procedureId } = req.params;
    const { nouvelleEtape } = req.body;

    const procedure = await Procedure.findById(procedureId);
    if (!procedure) return res.status(404).json({ error: 'Procédure introuvable' });

    const etapes = Procedure.getEtapes(procedure.type);
    if (!etapes.includes(nouvelleEtape)) {
      return res.status(400).json({ error: 'Étape non valide pour ce type de contrat' });
    }

    procedure.etapeCourante = nouvelleEtape;
    procedure.historique.push({ etape: nouvelleEtape, date: new Date() });
    await procedure.save();

    res.json(procedure);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la mise à jour de la procédure' });
  }
};

exports.getProceduresByClient = async (req, res) => {
  if (req.user.role !== 'client') return res.status(403).json({ error: 'Accès refusé' });
  try {
    const procedures = await Procedure.find({ client: req.user.id }).populate('contrat');
    res.json(procedures);
  } catch (error) {
    res.status(500).json({ error: 'Erreur interne' });
  }
};

exports.getAllProcedures = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Accès refusé' });
  try {
    const procedures = await Procedure.find()
      .populate('client', 'nom prenom passportNumber') // Inclure nom, prénom et numéro de passeport
      .populate('contrat', 'nom'); // Inclure le nom du contrat
    res.json(procedures);
  } catch (error) {
    res.status(500).json({ error: 'Erreur interne' });
  }
};
