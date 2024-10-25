const jwt = require('jsonwebtoken');

// Middleware d'authentification
const authenticate = (req, res, next) => {
  try {
    // Récupérer le token depuis les en-têtes HTTP
    const token = req.header('Authorization').replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
    }

    // Vérifier et décoder le token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Ajoute les infos utilisateur dans la requête
    next(); // Passe au prochain middleware ou route
  } catch (error) {
    res.status(401).json({ message: 'Token invalide ou expiré.' });
  }
};

module.exports = authenticate;
