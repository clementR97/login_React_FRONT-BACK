# 🔐 Projet MERN - Authentification JWT (Login & Inscription)

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Backend-Express-000000?logo=express&logoColor=white)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Runtime-Node.js-339933?logo=node.js&logoColor=white)
![Material-UI](https://img.shields.io/badge/UI-Material--UI-007FFF?logo=mui&logoColor=white)

> Application full-stack avec système d'authentification sécurisé utilisant JWT, incluant inscription, connexion, et gestion de mot de passe oublié.

---

## 📋 Table des matières

- [Vue d'ensemble](#-vue-densemble)
- [Technologies utilisées](#-technologies-utilisées)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture du projet](#-architecture-du-projet)
- [Ce que j'ai appris](#-ce-que-jai-appris)
- [Installation](#-installation)
- [Captures d'écran](#-captures-décran)
- [API Endpoints](#-api-endpoints)
- [Améliorations futures](#-améliorations-futures)

---

## 🎯 Vue d'ensemble

Ce projet est une application web full-stack permettant aux utilisateurs de :
- Créer un compte (inscription)
- Se connecter avec leurs identifiants
- Réinitialiser leur mot de passe en cas d'oubli
- Accéder à un espace personnel sécurisé (dashboard)

L'authentification est gérée via **JWT (JSON Web Tokens)** pour garantir la sécurité des sessions utilisateurs.

---

## 🛠 Technologies utilisées

### Backend
- **Node.js** - Environnement d'exécution JavaScript
- **Express.js** - Framework web minimaliste
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT (jsonwebtoken)** - Gestion des tokens d'authentification
- **Bcrypt.js** - Hashage sécurisé des mots de passe
- **Nodemailer** - Envoi d'emails pour la réinitialisation de mot de passe
- **Crypto** - Génération de tokens sécurisés

### Frontend
- **React** (avec Vite) - Bibliothèque UI
- **React Router DOM** - Gestion de la navigation
- **Material-UI (MUI)** - Framework de composants UI
- **Context API** - Gestion d'état globale
- **Fetch API** - Communication avec le backend

### DevOps & Outils
- **CORS** - Gestion des requêtes cross-origin
- **dotenv** - Variables d'environnement
- **ESLint** - Linting du code
- **Git** - Versioning

---

## ✨ Fonctionnalités

### ✅ Authentification complète
- [x] Inscription avec validation des données
- [x] Connexion sécurisée
- [x] Déconnexion
- [x] Mot de passe oublié avec envoi d'email
- [x] Réinitialisation du mot de passe via token
- [x] Protection des routes avec JWT
- [x] Persistance de session (localStorage)

### 🔒 Sécurité
- [x] Hashage des mots de passe avec bcrypt (10 rounds de salt)
- [x] Tokens JWT avec expiration (30 jours)
- [x] Validation des données côté serveur
- [x] Protection contre les injections MongoDB
- [x] Headers CORS configurés
- [x] Middleware d'authentification pour routes protégées

### 🎨 Interface utilisateur
- [x] Design moderne avec Material-UI
- [x] Formulaires réactifs avec validation en temps réel
- [x] Messages d'erreur explicites
- [x] Loading states pendant les requêtes
- [x] Responsive design (mobile-friendly)
- [x] Feedback visuel (alertes, spinners)

---

## 📁 Architecture du projet

```
Projet-MERN/
├── Backend/
│   ├── controllers/
│   │   └── authController.js      # Logique métier authentification
|   ├──config/
│   │   └── db.js      # connexion la base de données mongodb Atlas
│   ├── middleware/
│   │   └── authMiddleware.js      # Protection des routes
│   ├── models/
│   │   └── User.js                # Modèle utilisateur MongoDB
│   ├── routes/
│   │   └── authRoutes.js          # Routes API authentification
│   ├── utils/
│   │   └── sendEmail.js           # Utilitaire envoi d'emails
│   ├── server.js                  # Point d'entrée du serveur
│   ├── .env                       # Variables d'environnement
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── Components/
    │   │   ├── Login.jsx          # Page de connexion
    │   │   ├── SignUp.jsx         # Page d'inscription
    │   │   ├── Dashboard.jsx      # Espace utilisateur
    │   │   ├── ProtectedRoute.jsx # HOC pour routes protégées
    │   │   ├── ForgotPassword.jsx # Modal mot de passe oublié
    │   │   ├── CustomIcon.jsx     # Icônes personnalisées
    │   │   └── ComponentAccueil/
    │   │   │   ├──Navbar.jsx
    │   │   │   ├──Hero.jsx
    │   │   │   ├──Footer.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx    # Context d'authentification
    │   ├── services/
    │   │   └── api.js             # Service API centralisé
    │   ├── App.jsx                # Composant racine
    │   └── main.jsx               # Point d'entrée React
    ├── .env                       # Variables d'environnement
    ├── vite.config.js             # Configuration Vite
    └── package.json
```

---

## 🎓 Ce que j'ai appris

### 1. **Architecture Full-Stack**
- Comprendre la séparation Frontend/Backend
- Mettre en place une communication client-serveur via REST API
- Gérer les CORS pour permettre les requêtes cross-origin
- Structurer un projet MERN de manière professionnelle

### 2. **Backend avec Node.js & Express**

#### Gestion de l'authentification
```javascript
// Génération de token JWT
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
};
```
- Création d'API RESTful
- Middleware personnalisés pour la protection des routes
- Hashage sécurisé des mots de passe avec bcrypt
- Génération et vérification de tokens JWT

#### Base de données MongoDB avec Mongoose
```javascript
// Modèle utilisateur avec validation
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'le nom est requis'],
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Email invalide']
    },
    password: {
        type: String,
        required: true,
        select: false  // Ne pas retourner le password par défaut
    }
});
```
- Modélisation de données avec Mongoose
- Validation des schémas
- Middleware pre-save pour hasher les mots de passe
- Méthodes personnalisées (comparePassword)

#### Sécurité
```javascript
// Middleware de protection des routes
export const protect = async (req, res, next) => {
    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ){
        try{
            // Recover the token (format: "Bearer token")
            token = req.headers.authorization.split(' ')[1]
            //verifie and decod the token
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            // Add user in the request( without the password)
            req.user = await User.findById(decoded.id).select('-password')

            if(!req.user){
                return res.status(401).json({message:'Utilisateur non trouvé'})
            }
            next()

        }catch(error){
            console.error('Erreur auth middleware:',error)
            res.status(401).json({message: 'Non autorisé, token invalide'})
        }
    }
    if(!token){
        res.status(401).json({message:'Non autorisé, pas de token'})
    }
}
```
- Implémentation de JWT pour l'authentification stateless
- Protection des routes sensibles
- Gestion des tokens expirés
- Variables d'environnement pour les secrets

### 3. **Frontend avec React**

#### Context API pour la gestion d'état
```javascript
// Context d'authentification global
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const login = async (credentials) => {
        const data = await authAPI.login(credentials);
        setUser(data.user);
        localStorage.setItem('token', data.token);
    };
    
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
```
- Création d'un Context pour partager l'état d'authentification
- Custom hooks (useAuth) pour simplifier l'utilisation
- Gestion de l'état global sans Redux

#### Communication avec l'API
```javascript
// Service API centralisé
export const authAPI = {
    login: async (credentials) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(credentials)
        });
        return handleResponse(response);
    }
};
```
- Fetch API pour les requêtes HTTP
- Gestion centralisée des appels API
- Gestion des erreurs et du loading state
- Headers d'authentification automatiques

#### React Router & Routes protégées
```javascript
// Composant de route protégée
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) return <CircularProgress />;
    if (!isAuthenticated) return <Navigate to="/Sign-in" />;
    
    return children;
};
```
- Navigation avec React Router v6
- HOC (Higher-Order Component) pour protéger les routes
- Redirection conditionnelle basée sur l'authentification
- useNavigate pour la navigation programmatique

#### Material-UI & Design
- Utilisation de composants MUI pré-construits
- Styled components pour la personnalisation
- Responsive design avec breakpoints
- Formulaires avec validation en temps réel
- Feedback visuel (Alert, CircularProgress)

### 4. **Bonnes pratiques apprises**

#### Code propre
- Séparation des responsabilités (Controllers, Services, Routes)
- Nommage explicite des variables et fonctions
- Commentaires pertinents
- Gestion d'erreurs cohérente

#### Sécurité
- Ne jamais exposer les secrets dans le code
- Utilisation de variables d'environnement
- Validation des données en entrée
- Tokens avec expiration
- Ne jamais retourner les mots de passe dans les réponses

#### Performance
- Utilisation du select: false pour ne pas charger les passwords inutilement
- Indexes MongoDB pour optimiser les recherches
- Lazy loading des composants React (possible amélioration)

### 5. **Debugging & Résolution de problèmes**

#### Problèmes rencontrés et résolus
1. **Erreur CORS** : Configuration correcte des headers CORS dans Express
2. **Modules Node.js dans le navigateur** : Compréhension de la séparation Frontend/Backend
3. **Navigation React Router** : Utilisation de useEffect + useNavigate
4. **Token non envoyé** : Configuration des headers Authorization
5. **Vite vs Create React App** : Variables d'environnement VITE_ au lieu de REACT_APP_

#### Outils de debugging utilisés
- Console navigateur (Network tab, Console, Application/localStorage)
- Postman pour tester les API
- MongoDB Compass pour visualiser la BDD
- Console.log stratégiques
- React DevTools

### 6. **Workflow de développement**

```mermaid
graph LR
    A[User remplit formulaire] --> B[Validation frontend]
    B --> C[Appel API fetch]
    C --> D[Backend reçoit requête]
    D --> E[Validation backend]
    E --> F[Vérification MongoDB]
    F --> G[Génération JWT]
    G --> H[Réponse au frontend]
    H --> I[Stockage token localStorage]
    I --> J[Mise à jour Context]
    J --> K[Redirection Dashboard]
```

---

## 🚀 Installation

### Prérequis
- Node.js (v14+)
- MongoDB (local ou MongoDB Atlas)
- npm ou yarn

### 1. Cloner le projet
```bash
git clone https://github.com/clementR97/login_React_FRONT-BACK.git
cd login_React_FRONT-BACK
```

### 2. Configuration Backend

```bash
cd Backend
npm install
```

Créez un fichier `.env` :
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern_auth
JWT_SECRET=votre_secret_jwt_super_securise_ici
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**Générer un JWT_SECRET sécurisé :**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Démarrer le serveur :
```bash
npm run dev
```

### 3. Configuration Frontend

```bash
cd Frontend
npm install
```

Créez un fichier `.env` :
```env
VITE_API_URL=http://localhost:5000/api
```

Démarrer l'application :
```bash
npm run dev
```

### 4. Tester l'application

1. Ouvrez `http://localhost:5173`
2. Créez un compte via "Sign up"
3. Connectez-vous avec vos identifiants
4. Accédez au Dashboard

---

## 📸 Captures d'écran

### Page d'accueil
![Accueil](./screenshots/Accueil.png)
*Page d'accueil avec navigation vers Login et Sign Up*

### Inscription (Sign Up)
![Sign Up](./screenshoot/Sign-up.png)
*Formulaire d'inscription avec validation en temps réel*

### Connexion (Sign In)
![Sign In](./screenshoot/login.png)
*Formulaire de connexion sécurisé*

### Mot de passe oublié
![Forgot Password](./screenshoot/fogot-password.png)
*Modal pour réinitialiser le mot de passe*

### Dashboard / Validation des formulaires (Espace utilisateur)
![Dashboard,Validation](./screenshoot/dashboard.png)
*Espace personnel de l'utilisateur connecté*
*Messages d'erreur en temps réel*

### MongoDB Atlas
![MongoDB](./screenshoot/mongodb.png)
*Utilisateurs stockés dans MongoDB*

### Console réseau
![Network](./screenshoot/network.png)
*Requêtes API avec token JWT dans les headers*

### LocalStorage
![LocalStorage](./screenshoot/localhost.png)
*Token et données utilisateur stockés localement*

---

## 🔌 API Endpoints

### Authentification

| Méthode | Endpoint | Description | Auth requise |
|---------|----------|-------------|--------------|
| POST | `/api/auth/register` | Créer un nouveau compte | Non |
| POST | `/api/auth/login` | Se connecter | Non |
| POST | `/api/auth/forgot-password` | Demander réinitialisation MDP | Non |
| POST | `/api/auth/reset-password/:token` | Réinitialiser le MDP | Non |
| GET | `/api/auth/profile` | Récupérer le profil utilisateur | Oui |

### Exemples de requêtes

#### Inscription
```javascript
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

// Réponse
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Connexion
```javascript
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

// Réponse
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Profil (route protégée)
```javascript
GET /api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Réponse
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2025-01-15T10:30:00.000Z"
}
```

---

## 🔮 Améliorations futures

### Court terme
- [ ] Ajouter un système de rôles (User, Admin)
- [ ] Implémenter le Refresh Token
- [ ] Ajouter la validation côté client avec Formik + Yup
- [ ] Améliorer le design du Dashboard
- [ ] Ajouter des tests unitaires (Jest, React Testing Library)

### Moyen terme
- [ ] Authentification OAuth (Google, Facebook)
- [ ] Vérification d'email lors de l'inscription
- [ ] Authentification à deux facteurs (2FA)
- [ ] Page de profil utilisateur avec édition
- [ ] Upload d'avatar

### Long terme
- [ ] Migration vers TypeScript
- [ ] Implémenter Redis pour les sessions
- [ ] Rate limiting pour éviter les attaques brute force
- [ ] Logs d'audit des connexions
- [ ] Déploiement sur AWS/Heroku/Vercel

---

## 📚 Ressources & Documentation

### Documentation officielle
- [React](https://react.dev/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/docs/)
- [Mongoose](https://mongoosejs.com/)
- [Material-UI](https://mui.com/)
- [JWT](https://jwt.io/)

### Tutoriels suivis
- [React Context API - React Documentation](https://react.dev/learn/passing-data-deeply-with-context)

---

## 👨‍💻 Auteur

**Clément Roland.**
- GitHub: [@clementR97](https://github.com/clementR97)


---

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- Material-UI pour les composants UI magnifiques
- MongoDB pour la base de données flexible
- La communauté MERN pour les ressources
- Stack Overflow pour les réponses aux questions 😄

---

## 💬 Support

Pour toute question ou problème :
- Ouvrez une [issue](https://github.com/clementR97/login_React_FRONT-BACK/issues)
- Contactez-moi par email : clementroland52@gmail.com

---

**⭐ Si ce projet vous a aidé, n'hésitez pas à lui donner une étoile !**

