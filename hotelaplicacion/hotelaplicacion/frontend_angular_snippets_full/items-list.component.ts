// src/app/pages/items-list/items-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html'
})
export class ItemsListComponent implements OnInit {
  items: any[] = [];
  constructor(private api: ApiService) {}
  ngOnInit() { this.api.getItems().subscribe(data => this.items = data); }
}
