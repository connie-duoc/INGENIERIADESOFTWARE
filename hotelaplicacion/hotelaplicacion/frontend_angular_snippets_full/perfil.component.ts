// src/app/pages/perfil/perfil.component.ts
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent {
  name = 'Connie';
  message = '';

  constructor(private api: ApiService) {}

  guardar() {
    this.api.updateProfile(this.name).subscribe({
      next: (res) => this.message = 'Perfil actualizado: ' + res.user.name,
      error: (err) => this.message = err.error?.error || 'Error al actualizar'
    });
  }
}
