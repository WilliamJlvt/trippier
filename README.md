# Trippier

Projet monorepo regroupant une application Web (Next.js), un Backend API (NestJS) et une application Mobile (React Native).

## 📂 Structure

- **`/backend`** : API NestJS (Port 3001)
- **`/frontend`** : Interface Web Next.js (Port 3000)
- **`/mobile`** : Application React Native (Android/iOS)
- **`/docker`** : Configuration des conteneurs
- **`Makefile`** : Commandes simplifiées pour gérer le projet

## 🚀 Démarrage Rapide (Docker)

### Prérequis
- Docker
- Make (optionnel, mais recommandé)

### 1. Lancer la Stack Web (Back + Front)
Cette commande construit une image Docker unique (basée sur Alpine) qui lance le Backend et le Frontend en parallèle.

```bash
make run-stack
```

Une fois lancé :
- **Frontend** : [http://localhost:3000](http://localhost:3000)
- **Backend** : [http://localhost:3001](http://localhost:3001)

### 2. Générer l'APK Android
Cette commande utilise un conteneur Docker avec le SDK Android pour compiler l'application mobile sans avoir besoin d'installer Android Studio sur votre machine.

```bash
make build-apk
```

L'APK généré se trouvera ici :
`mobile/android/app/build/outputs/apk/release/app-release.apk`

---

## 🛠 Développement Local (Sans Docker)

Si vous souhaitez développer sur votre machine directement :

### Backend
```bash
cd backend
npm install
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Mobile (Android)
Nécessite Android Studio et le SDK Android configurés.
```bash
cd mobile
npm install
npm run android
```
