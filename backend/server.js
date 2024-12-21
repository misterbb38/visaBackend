// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./utils/db.js');




const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contratRoutes = require('./routes/contratRoutes');
const procedureRoutes = require('./routes/procedureRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à la base de données
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contrats', contratRoutes);
app.use('/api/procedures', procedureRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
