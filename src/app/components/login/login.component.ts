import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule],
})
export class LoginComponent {
  constructor(public router: Router) {}

  login() {
    // this.authService.login(this.email, this.password);
    this.router.navigate(['quiz']);
  }

  // authService = inject(AuthService);
  email: string = '';
  password: string = '';
}
