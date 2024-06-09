# Utiliser une image de base officielle Node.js comme runtime
# on part d'une image existante
# Ce node:20 lui même part d'un Linux 
FROM node:20

# Définir un répertoire de travail à l'intérieur du conteneur (au choix, mais typique pour les projets Node)
# Dans le conteneur, on fait un cd /usr/src/app
WORKDIR /usr/src/app

# Copier le package.json et le package-lock.json (local) dans le répertoire de travail courant du conteneur (./)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code de l'application dans le conteneur
# Note : on copie d'abord le package.json avant de tout copier pour que l'étape précédente soit "mise en cache" et que ça aille plus vite quand on re-génère l'image
COPY . .

# Exposer le port spécifié dans l'app au reste du monde
EXPOSE 5173

# Définir la commande qui sera exécuté automatiquement à l'instanciation d'un conteneur ==> démarrer mon serveur Node
CMD ["npm", "run", "dev"]
