// src/app/pages/reserva/reserva.component.ts
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html'
})
export class ReservaComponent {
  itemId = 1;
  date = new Date().toISOString().substring(0,10);
  result = '';

  constructor(private api: ApiService) {}

  reservar() {
    const dateISO = new Date(this.date).toISOString();
    this.api.createReservation(this.itemId, dateISO).subscribe({
      next: (res) => this.result = 'Reserva creada: ' + res.reservation.code,
      error: (err) => this.result = err.error?.error || 'Error al reservar'
    });
  }
}
