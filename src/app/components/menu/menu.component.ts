import { Component, Inject, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  loggedIn: boolean = false;
  // authService = inject(AuthService);

  constructor() {
    // this.loggedIn = this.authService.isLoggedIn;
  }
}
