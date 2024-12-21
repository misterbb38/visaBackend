// backend/controllers/userController.js
const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Accès refusé' });
  const users = await User.find({}, '-password');
  res.json(users);
};
