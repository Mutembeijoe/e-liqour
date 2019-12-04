import { AppUser } from './../models/appuser';
import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private userS: UsersService, private auth: AuthService) { }

  canActivate() {
    return this.auth.user$.pipe(
      switchMap(user => this.userS.read(user.uid)),
      map((dbUser: AppUser) => dbUser.isAdmin)
    );
  }
}
