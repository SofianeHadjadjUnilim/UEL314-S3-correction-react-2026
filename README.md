# Frontend React - Gestion des Utilisateurs

Ce projet est une interface React (Vite + TypeScript) pour gérer des utilisateurs via une API NestJS.

## Prérequis

- Node.js (version 18 ou supérieure)
- pnpm (gestionnaire de paquets)
- Un backend NestJS en fonctionnement

## Installation et Lancement

### Étape 1 : Lancer le backend

Avant de démarrer le frontend, assurez-vous que votre backend NestJS est lancé et accessible.

```bash
# Aller dans le dossier du backend
cd /chemin/vers/votre/backend

# Installer les dépendances (si ce n'est pas déjà fait)
npm install

# Lancer le backend en mode développement
npm run start:dev
```

Le backend devrait être accessible sur `http://localhost:3000`.

### Étape 2 : Configurer l'URL du backend

Vérifiez que le fichier `.env.development` contient la bonne URL de votre backend :

```
VITE_API_URL=http://localhost:3000
```

### Étape 3 : Installer les dépendances du frontend

```bash
# Se placer dans le dossier frontend
cd /chemin/vers/ce/projet/frontend

# Installer les dépendances avec pnpm
pnpm install
```

### Étape 4 : Lancer le frontend

```bash
# Lancer le serveur de développement
pnpm dev
```

Le frontend sera accessible sur `http://localhost:5173`.

## Utilisation

Une fois le frontend lancé, vous pouvez :

- **Voir la liste des utilisateurs** : Affichage automatique au chargement de la page
- **Ajouter un utilisateur** : Cliquer sur "Ajouter un utilisateur"
- **Modifier un utilisateur** : Cliquer sur "Modifier" dans la ligne de l'utilisateur
- **Supprimer un utilisateur** : Cliquer sur "Supprimer" dans la ligne de l'utilisateur
- **Rechercher par ID** : Cliquer sur "Rechercher par ID" et sélectionner un utilisateur dans la liste

## Structure du Projet

```
frontend/
├── src/
│   ├── components/       # Composants React
│   ├── hooks/            # Hooks personnalisés
│   ├── services/         # Services API
│   ├── types/            # Types TypeScript
│   └── App.tsx           # Composant principal
├── .env.development      # Configuration développement
└── package.json          # Dépendances du projet
```

## Backend Requis

Le backend doit exposer les endpoints suivants :

- `GET /users` - Liste tous les utilisateurs
- `GET /users/:id` - Récupère un utilisateur par son ID
- `POST /users` - Crée un nouvel utilisateur (body: `{ firstname, lastname }`)
- `PATCH /users/:id` - Modifie un utilisateur (body: `{ firstname?, lastname? }`)
- `DELETE /users/:id` - Supprime un utilisateur

## Aide

En cas de problème :

1. Vérifiez que le backend est bien lancé et accessible
2. Vérifiez que l'URL dans `.env.development` est correcte
3. Vérifiez la console du navigateur (F12) pour voir les erreurs éventuelles
4. Relancez le frontend avec `pnpm dev`
