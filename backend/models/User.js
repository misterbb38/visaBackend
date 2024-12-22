// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  numeroClient: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'client'], default: 'client' },
  
  // Nouveaux champs
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  passportNumber: { type: String, },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
