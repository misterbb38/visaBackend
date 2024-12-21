// backend/models/Contrat.js
const mongoose = require('mongoose');

const contratSchema = new mongoose.Schema({
  type: { type: String, enum: ['simple', 'visa'], required: true },
  prixTotal: { type: Number, required: true },
  prixAvance: { type: Number, required: true },
  delaisTraitement: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contrat', contratSchema);
