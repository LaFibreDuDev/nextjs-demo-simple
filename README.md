Next.js 16 + Bun + PostgreSQL, déployé via Dokploy.

## Développement local

```bash
bun install
bun dev
```

## Déploiement sur Dokploy

### 1. Base de données

Créer une base PostgreSQL depuis le panel Dokploy, puis initialiser les tables et données via le script de seed :

```bash
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<db>" bun seed
```

Le script est idempotent — il peut être relancé sans risque de doublons.

### 2. Service applicatif

Dans Dokploy, créer un service **Docker Compose** pointant sur ce dépôt.

Définir la variable d'environnement suivante :

| Variable | Valeur |
|---|---|
| `DATABASE_URL` | `postgresql://<user>:<password>@<host>:<port>/<db>` |

Dokploy l'injecte automatiquement dans le conteneur via le `compose.yml`.

### 3. Déployer

Lancer le déploiement depuis le panel Dokploy. Le service utilise `Dockerfile.bun` (build multi-stage, image finale légère basée sur `oven/bun`).

Pour les déploiements suivants, un push sur la branche configurée suffit si le webhook Dokploy est activé.
