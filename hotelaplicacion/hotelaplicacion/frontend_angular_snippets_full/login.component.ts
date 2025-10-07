// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = 'demo@demo.cl';
  password = 'Demo*123';
  message = '';

  constructor(private api: ApiService, private auth: AuthService) {}

  doLogin() {
    this.api.login(this.email, this.password).subscribe({
      next: (res) => {
        this.auth.token = res.token;
        this.api.setToken(res.token);
        this.message = 'Login OK: ' + res.user.name;
      },
      error: (err) => this.message = err.error?.error || 'Error de login'
    });
  }
}
