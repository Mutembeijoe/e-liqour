import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object(`/users/${user.uid}`).update({
      name: user.displayName,
      email: user.email
    });
  }
}
