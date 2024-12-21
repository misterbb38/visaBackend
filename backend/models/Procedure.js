// backend/models/Procedure.js
const mongoose = require('mongoose');

const etapesContratSimple = [
  'document_deposer',
  'traitement_en_cours',
  'contrat_recu',
  'fin_du_dossier'
];

const etapesContratVisa = [
  'document_deposer',
  'traitement_en_cours',
  'contrat_recu',
  'traitement_visa',
  'visa_deposer',
  'decision_visa'
];

const procedureSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contrat: { type: mongoose.Schema.Types.ObjectId, ref: 'Contrat', required: true },
  type: { type: String, enum: ['simple', 'visa'], required: true },
  etapeCourante: { type: String, required: true },
  historique: [{ etape: String, date: Date }],
  createdAt: { type: Date, default: Date.now }
});

// Méthode pour obtenir les étapes possibles selon le type
procedureSchema.statics.getEtapes = function(type) {
  return type === 'simple' ? etapesContratSimple : etapesContratVisa;
};

module.exports = mongoose.model('Procedure', procedureSchema);
