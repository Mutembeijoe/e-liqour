import { AppUser } from './../models/appuser';
import { UsersService } from './users.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(private userS: UsersService, private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = this.afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser() {
    return this.user$.pipe(
      switchMap(user => {
        if (user) return this.userS.read(user.uid);
        return of(null);
      })
    );
  }
}
