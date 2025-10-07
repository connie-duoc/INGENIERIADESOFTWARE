// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private key = 'token';
  set token(t: string | null) { 
    if (t) localStorage.setItem(this.key, t);
    else localStorage.removeItem(this.key);
  }
  get token(): string | null { return localStorage.getItem(this.key); }
}
