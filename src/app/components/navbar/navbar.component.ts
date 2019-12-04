import { AppUser } from './../../models/appuser';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  appUser: AppUser;

  constructor(public auth: AuthService) {
    this.auth.appUser.subscribe((user: AppUser) => this.appUser = user);
  }

  logout() {
    this.auth.logout();
  }
}
