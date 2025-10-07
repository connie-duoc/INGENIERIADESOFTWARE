# Backend – PRY3211 (Express + Prisma + SQLite)

## Setup
```
cd backend
npm i
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run dev
```
API: `http://localhost:4000`

### Endpoints
- POST `/api/auth/login` { email, password } → { token, user }
- PUT `/api/users/me` (Bearer) { name } → actualizar perfil
- POST `/api/users` (ADMIN) { email, password, name, role } → crear usuario
- GET `/api/items` → listar ítems y stock
- GET `/api/reservations` (Bearer) → listar mis reservas
- POST `/api/reservations` (Bearer) { itemId, date } → crear reserva (decrementa stock)
