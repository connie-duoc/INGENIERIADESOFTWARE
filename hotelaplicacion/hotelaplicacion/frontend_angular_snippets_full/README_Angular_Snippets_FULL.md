# Snippets Angular – Full (Login, Reserva, Perfil, Admin, Listados)

## 1) Copia estos archivos en tu proyecto Angular
- `src/app/services/api.service.ts`
- `src/app/services/auth.service.ts`
- `src/app/pages/login/login.component.ts|html`
- `src/app/pages/reserva/reserva.component.ts|html`
- `src/app/pages/perfil/perfil.component.ts|html`
- `src/app/pages/admin-usuarios/admin-usuarios.component.ts|html`
- `src/app/pages/items-list/items-list.component.ts|html`
- `src/app/pages/reservas-list/reservas-list.component.ts|html`

## 2) AppModule (importa y declara)
```ts
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './pages/login/login.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AdminUsuariosComponent } from './pages/admin-usuarios/admin-usuarios.component';
import { ItemsListComponent } from './pages/items-list/items-list.component';
import { ReservasListComponent } from './pages/reservas-list/reservas-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, ReservaComponent, PerfilComponent,
    AdminUsuariosComponent, ItemsListComponent, ReservasListComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule]
})
export class AppModule {}
```

## 3) Rutas sugeridas
```ts
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reserva', component: ReservaComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'admin', component: AdminUsuariosComponent },
  { path: 'items', component: ItemsListComponent },
  { path: 'mis-reservas', component: ReservasListComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
```

## 4) Ajusta la base URL si cambias el puerto
En `api.service.ts` cambia `private base = 'http://localhost:4000/api';`

## 5) Flujo de evidencia
1. Login (token) → ver mensaje "Login OK".
2. Items (GET) → ver stock.
3. Crear reserva → ver código y luego en "Mis reservas" aparece la nueva fila.
4. Editar perfil → ver el nombre actualizado.
5. Admin crea usuario → ver confirmación (logueado como ADMIN).
