import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import User from '../model/user.model';
import { Router } from '@angular/router';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authUrl = 'http://localhost:3000/api/v1/user';
  private _jwtHelper = new JwtHelperService();


  private _authHeaders = new HttpHeaders({
    'Authorization': this.authToken,
  });

  constructor(private http: HttpClient, private router: Router, private dialogService: DialogService) { }

  get authToken() {
    return localStorage.getItem('token');
  }

  get authUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  get isUserLoggedIn() {
    const token = localStorage.getItem('token');

    if (token == null) {
      return false;
    }

    return !this._jwtHelper.isTokenExpired(token);
  }

  logoutUser() {
    this.http.get(`${this._authUrl}/logout`, {
      headers: this._authHeaders
    }).toPromise()
    .then(() => {
      this.removeTokenFromStorage();
      this.router.navigate(['/']);
    })
    .catch((err) => {
      // console.error('Can\'t connect to the server');
      // console.log(err);
      this.removeTokenFromStorage();
      this.router.navigate(['/']);
    });
  }

  removeTokenFromStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /** Make HTTP request to the server to
   * check whether the given email is still available
   * @param email must be a valid email
   * @return Observable which contain the data from the server
   */
  isEmailAvailable(email: string) {
    return this.http.get(`${this._authUrl}/is-available`, {
      params: new HttpParams().set('email', email),
    });
  }

  /** Make post HTTP request to the server to register with the given user
   *  @returns Promise which can be used to detect when the request is over
   */
  registerUser(user: User) {
    return this.http.post(`${this._authUrl}/register`, {
      user: user.toJSON(),
    }).toPromise().then((data: RegisterRespond) => {
      this.router.navigate(['/email-confirm', { email: data.savedUser.email }]);
    }).catch(err => {
      // console.log(err);
      this.router.navigate(['/error', { errorMessage: err.error.message }]);
    });
  }

  /**
   * Make post HTTP request to the server to login with the given credentials
   * @param email must be valid email
   * @param password must at least 8 characters long
   */
  signInUser(email: string, password: string) {
    return this.http.post(`${this._authUrl}/login`, {
      email,
      password,
    }).toPromise()
    .then((user: LoginRespond) => {
      this._storeUserData(user.data);
      if (this.dialogService.nextNavigation) {
        this.router.navigate([this.dialogService.nextNavigation]);
      } else {
        this.router.navigate(['/overview']);
      }
    });
  }

  checkForValidToken() {
    return this.http.get(`${this._authUrl}/login`, {
      headers: this._authHeaders,
    }).toPromise()
    .then(() => {
      // successfully logged in
      // console.log('Successfully logged in');
      this.router.navigate(['/']);
      return true;
    })
    .catch((err) => {
      // console.log('No user found');
      // console.error(err);
      this.removeTokenFromStorage();
      // this.router.navigate(['/']);
      return false;
    });
  }

  sendConfirmationEmail(email: string) {
    return this.http.post(`${this._authUrl}/confirm`, {
      email: email,
    });
  }

  verifyEmailToken(emailToken: string) {
    return this.http.get(`${this._authUrl}/confirm/${emailToken}`);
  }

  private _storeUserData(data) {
    localStorage.setItem('token', 'JWT-transfer ' + data.token);
    localStorage.setItem('user', JSON.stringify({ email: data.email, id: data.userId, name: data.name }));
  }
}

interface RegisterRespond {
  savedUser: {
    email: string
  };
}

interface LoginRespond {
  data: {
    email: string,
    token: string,
    userId: string,
    name: string,
  };
  message: string;
}
