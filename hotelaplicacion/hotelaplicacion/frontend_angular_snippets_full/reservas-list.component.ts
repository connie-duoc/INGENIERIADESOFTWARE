// src/app/pages/reservas-list/reservas-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-reservas-list',
  templateUrl: './reservas-list.component.html'
})
export class ReservasListComponent implements OnInit {
  rows: any[] = [];
  constructor(private api: ApiService) {}
  ngOnInit() { this.api.listReservations().subscribe(data => this.rows = data); }
}
