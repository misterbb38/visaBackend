// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { numeroClient, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ numeroClient, password: hashedPassword, role });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la création de l\'utilisateur' });
  }
};

exports.login = async (req, res) => {
  try {
    const { numeroClient, password } = req.body;
    const user = await User.findOne({ numeroClient });
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user._id, role: user.role }, 'secret_jwt', { expiresIn: '1d' });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: 'Erreur interne' });
  }
};
