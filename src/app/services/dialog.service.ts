import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  showSignin = false;
  showSignup = false;
  isLoading = false;

  constructor() { }

  // Signin
  closeSignin() {
    this.showSignin = false;
  }

  viewSignin() {
    this.showSignin = true;
  }

  // Signup
  closeSignup() {
    this.showSignup = false;
  }

  viewSignup() {
    this.showSignup = true;
  }

  // Loading
  startLoading() {
    this.isLoading = true;
  }

  stopLoading() {
    this.isLoading = false;
  }
}
