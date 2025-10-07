// src/app/pages/admin-usuarios/admin-usuarios.component.ts
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html'
})
export class AdminUsuariosComponent {
  email = '';
  password = '';
  name = '';
  role = 'CLIENT';
  message = '';

  constructor(private api: ApiService) {}

  crear() {
    this.api.createUser(this.email, this.password, this.name, this.role).subscribe({
      next: (res) => this.message = 'Usuario creado: ' + res.user.email,
      error: (err) => this.message = err.error?.error || 'Error al crear'
    });
  }
}
