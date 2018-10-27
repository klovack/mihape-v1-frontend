import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import User from '../model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _emailCheckUrl = 'http://localhost:3000/api/v1/user/is-available';
  private _registerUrl = 'http://localhost:3000/api/v1/user/register';
  private _loginUrl = 'http://localhost:3000/api/v1/user/login';
  private _confirmUrl = 'http://localhost:3000/api/v1/user/confirm';

  constructor(private http: HttpClient, private router: Router) { }

  get authToken() {
    return localStorage.getItem('token');
  }

  get authUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  get isUserLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  /** Make HTTP request to the server to
   * check whether the given email is still available
   * @param email must be a valid email
   * @return Observable which contain the data from the server
   */
  isEmailAvailable(email: string) {
    return this.http.get(this._emailCheckUrl, {
      params: new HttpParams().set('email', email),
    });
  }

  /** Make post HTTP request to the server to register with the given user
   *  @returns Promise which can be used to detect when the request is over
   */
  registerUser(user: User) {
    return this.http.post(this._registerUrl, {
      user: user.toJSON(),
    }).toPromise().then((data: RegisterRespond) => {
      this.router.navigate(['/email-confirm', { email: data.savedUser.email }]);
    }).catch(err => {
      console.log(err);
      this.router.navigate(['/error', { errorMessage: err.error.message }]);
    });
  }

  /**
   * Make post HTTP request to the server to login with the given credentials
   * @param email must be valid email
   * @param password must at least 8 characters long
   */
  signInUser(email: string, password: string) {
    return this.http.post(this._loginUrl, {
      email,
      password,
    }).toPromise()
    .then((user: LoginRespond) => {
      this._storeUserData(user.data);
      this.router.navigate(['/overview']);
    });
  }

  sendConfirmationEmail(email: string) {
    return this.http.post(this._confirmUrl, {
      email: email,
    });
  }

  verifyEmailToken(emailToken: string) {
    return this.http.get(`${this._confirmUrl}/${emailToken}`);
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
