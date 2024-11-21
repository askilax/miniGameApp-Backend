# MiniGameApp - Backend

Bienvenue sur le projet **MiniGameApp - Backend** ! Ce dépôt contient le code backend de l'application MiniGameApp, qui gère les fonctionnalités principales côté serveur, y compris l'authentification, la gestion des utilisateurs, et le suivi des scores. Le backend est développé en utilisant Node.js avec Express.

## Table des Matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Bonnes Pratiques de Sécurité](#bonnes-pratiques-de-sécurité)
- [Contact](#contact)

## Aperçu

Le backend de **MiniGameApp** est responsable de fournir les API pour l'authentification des utilisateurs, la gestion des mini-jeux, le stockage des scores, et l'ensemble des services nécessaires pour assurer une expérience utilisateur cohérente et sécurisée.

## Fonctionnalités

- **API REST** : Fournit des endpoints pour gérer les utilisateurs, les scores, et les statistiques des jeux.
- **Authentification JWT** : Authentification sécurisée avec JSON Web Tokens pour protéger les endpoints sensibles.
- **Gestion des Utilisateurs** : Inscription, connexion, et gestion des profils utilisateurs.
- **Suivi des Scores** : Stocke et met à jour les scores des joueurs pour suivre leur progression.

## Technologies Utilisées

- **Node.js** et **Express** : Pour le développement du serveur backend.
- **MongoDB** avec **Mongoose** : Base de données NoSQL pour stocker les informations des utilisateurs et des scores.
- **JWT** : Pour l'authentification des utilisateurs et la sécurisation des sessions.
- **argon2** : Pour le hachage sécurisé des mots de passe des utilisateurs.

## Bonnes Pratiques de Sécurité

Pour éviter les fuites de données et garantir la sécurité de l'application :

- **Ne jamais exposer les clés sensibles** : Assurez-vous que le fichier `.env` n'est jamais poussé sur un dépôt public.
- **Utilisez argon2 pour les mots de passe** : Tous les mots de passe sont hachés avec argon2 avant d'être stockés en base de données.
- **Authentification JWT sécurisée** : Les JSON Web Tokens sont utilisés pour protéger les endpoints, et doivent être stockés de manière sécurisée côté client.

## Contact

Pour toute question, suggestion ou collaboration, vous pouvez me contacter via :
- **Email** : maximesbaizero@gmail.com
- **GitHub** : [Maxime Sbaizero](https://github.com/askilax)

Merci d'avoir pris le temps de découvrir le backend de **MiniGameApp** !

---

© 2024 MiniGameApp - Tous droits réservés.

