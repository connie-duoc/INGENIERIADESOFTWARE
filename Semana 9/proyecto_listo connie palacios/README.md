# Proyecto listo — Express + Frontend estático (login y roles)

✅ Listo para correr sin build de frontend.

## Requisitos
- Node.js 18+
- (Opcional) crear `.env` copiando desde `.env.example`

## Pasos
```bash
npm install
npm start
# abre http://localhost:4000
```

## Usuarios de demo
- Admin: `admin@demo.cl` / `Admin*123`
- Cliente: `cliente@demo.cl` / `Demo*123`

## Endpoints
- `GET /api/health`
- `POST /api/auth/register` — `{ name,email,password,role }`
- `POST /api/auth/login` — `{ email,password }`
- `GET /api/items` — (token)
- `GET /api/admin/users` — (token + rol admin)

El servidor guarda usuarios en `data/users.json`.
