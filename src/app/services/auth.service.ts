import { Injectable } from '@angular/core';
import { User, userProfile } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';

import firebase from 'firebase/app';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  public user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      await this.updateUserData(user,null,null);
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async register(email: string, password: string, nombre: string, apellido: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerifcationEmail();
      await this.updateUserData(user,nombre,apellido);
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password); 
      this.afs.collection("users").doc(user.uid).update({emailVerified: true});
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async sendVerifcationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  isEmailVerified(user: User): boolean {
    return user.emailVerified === true ? true : false;
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  private updateUserData(user: User, nombre: string, apellido: string) {
    const userRef: AngularFirestoreDocument<userProfile> = this.afs.doc(`users/${user.uid}`);

    var data: userProfile;

    if(nombre == null){
      data = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        nombre: user.displayName,
        apellido: null
      };
    } else {
      data = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        nombre: nombre,
        apellido: apellido
      };
    }
    
    
    return userRef.set(data, { merge: true });
  }
}


// // you can rewrite this
// const name = app.name;
// const version = app.version;
// const type = app.type;

// // as this
// const { name, version, type } = app;

// return this.angularFirestore.collection(coleccion).snapshotChanges();