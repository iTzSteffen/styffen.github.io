import { Inject, Injectable, NgZone, OnInit } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  userData: any;

  constructor(
    public router: Router,
    private fireauth: AngularFireAuth,
    public ngZone: NgZone,
    @Inject(DOCUMENT) private document: Document
  ) {
    const localStorage = document.defaultView?.localStorage;
    // Setting logged in user in localstorage else null
    this.fireauth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage?.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage?.getItem('user')!);
      } else {
        localStorage?.setItem('user', 'null');
        localStorage?.getItem('user')!;
      }
    });
  }
  ngOnInit(): void {
    localStorage.setItem('user', 'null');
  }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('user', JSON.stringify(this.userData));

        if (res.user?.emailVerified == true) {
          this.router.navigate(['quiz']);
        } else {
          this.router.navigate(['quiz']);
        }
      },
      (err) => {
        this.router.navigate(['/login']);
      }
    );
  }

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        alert('Registration Successful');
        this.sendEmailForVarification(res.user);
        this.router.navigate(['login']);
      },
      (err) => {
        this.router.navigate(['register']);
      }
    );
  }

  sendEmailForVarification(user: any) {
    console.log(user);
    user.sendEmailVerification().then(
      (res: any) => {
        this.router.navigate(['verify-email']);
      },
      (err: any) => {
        alert('Something went wrong. Not able to send mail to your email.');
      }
    );
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = localStorage.getItem('user')!;
    if (user == null) {
      return false;
    } else {
      return true;
    }
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.fireauth
      .signInWithPopup(provider)
      .then((result: any) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
      })
      .catch((error: any) => {
        window.alert(error);
      });
  }

  // Sign out
  SignOut() {
    return this.fireauth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
