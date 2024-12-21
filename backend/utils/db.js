const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Base de données connectée");
  } catch (err) {
    console.error("Erreur de connexion à la BD :", err);
    process.exit(1);
  }
};

module.exports = connectDB;
