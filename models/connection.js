const mongoose = require('mongoose');

const connectionString = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, { connectTimeoutMS: 2000 });
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Arrêter le processus si la connexion échoue
  }
};

module.exports = connectDB;