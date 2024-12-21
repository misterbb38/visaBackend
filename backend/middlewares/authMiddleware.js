// backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Token manquant' });

  const token = header.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token invalide' });

  jwt.verify(token, 'secret_jwt', (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token non valide' });
    req.user = decoded; // id, role
    next();
  });
};
