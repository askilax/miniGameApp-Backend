const express = require('express');
const router = express.Router();
const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const authenticate = require('../middlewares/authenticate');
const crypto = require('crypto')

// Inscription
router.post('/register', async (req, res) => {
  //recup des données 
  const { email, username, password } = req.body;
  try {
    // rajoute une chaine de caractere unique pour chaque user
    const salt = crypto.randomBytes(16).toString('hex');
    // pepper recup la chaine de caractere dans le .env
    const pepper = process.env.PEPPER;
    // combine le salt et pepper
    const combinedPassword = password + pepper + salt;
    //hash le mdp et stock le user
    const hashedPassword = await argon2.hash(combinedPassword);
    const newUser = new User({ email, username, password: hashedPassword, salt });
    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  const { emailOrUsername, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });
    if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

    const pepper = process.env.PEPPER;
    const combinedPassword = password + pepper + user.salt;


    const isMatch = await argon2.verify(user.password, combinedPassword);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, email: user.email, username: user.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route protégée : récupérer des informations utilisateur
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // On ne retourne pas le mot de passe
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;