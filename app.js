require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
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
  console.log('Setting helmet middleware');
  app.use(helmet());

  console.log('Setting mongoSanitize middleware');
  app.use(mongoSanitize());

  console.log('Setting hpp middleware');
  app.use(hpp());

  console.log('Setting xssClean middleware');
  app.use(xssClean());

  if (process.env.NODE_ENV === 'production') {
    console.log('Setting rate limiting');
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, 
      max: 100,
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
