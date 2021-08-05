import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface'; 

import firebase from 'firebase/app';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public usuario:User;
  public usuarios:

  constructor() { }
}
