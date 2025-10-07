// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'http://localhost:4000/api';
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  setToken(t: string) { this.token = t; }
  get headers() {
    return new HttpHeaders({ 'Authorization': this.token ? `Bearer ${this.token}` : '' });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.base}/auth/login`, { email, password });
  }

  updateProfile(name: string): Observable<any> {
    return this.http.put(`${this.base}/users/me`, { name }, { headers: this.headers });
  }
  createUser(email:string, password:string, name:string, role:string='CLIENT'): Observable<any> {
    return this.http.post(`${this.base}/users`, { email, password, name, role }, { headers: this.headers });
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/items`);
  }

  createReservation(itemId:number, date:string): Observable<any> {
    return this.http.post(`${this.base}/reservations`, { itemId, date }, { headers: this.headers });
  }
  listReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/reservations`, { headers: this.headers });
  }
}
