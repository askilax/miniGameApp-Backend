require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
hpp = require('hpp');
const xssClean = require('xss-clean');
const usersRouter = require('./routes/users');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const indexRouter = require('./routes/index');
const connectDB = require('./models/connection');


const app = express();
connectDB();

// Middleware de sécurité

const setSecurityMiddleware = (app) => {
  // Protéger les en-têtes HTTP
  app.use(helmet());

  // Protection contre les injections dans MongoDB
  app.use(mongoSanitize());

  // Protection contre les attaques par pollution des paramètres HTTP
  app.use(hpp());

  // Protection contre les attaques de script intersites (XSS)
  app.use(xssClean());

  // Limite de Requête - Utiliser uniquement en production
  if (process.env.NODE_ENV === 'production') {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limite chaque IP à 100 requêtes
      message: {
        code: 429,
        message: "Trop de requêtes depuis cette adresse IP, veuillez réessayer plus tard."
      }
    });
    app.use(limiter);
  }
};

// Middleware pour les logs
const setLoggingMiddleware = (app) => {
  app.use(logger('dev'));
};

// Initialiser tous les middleware
setSecurityMiddleware(app);
setLoggingMiddleware(app);

// Configuration CORS
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
}));
//process.env.CORS_ORIGIN || 'http://localhost:19006'  post developpement


// Analyse des cookies et des corps de requêtes
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Une erreur est survenue sur le serveur.' });
});

module.exports = app;
