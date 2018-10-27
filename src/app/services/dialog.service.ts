import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  showSignin = false;
  showSignup = false;
  showCurtain = false;
  isLoading = false;
  hasConnectionError = false;

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
    this.showCurtain = true;
    this.isLoading = true;
  }

  stopLoading() {
    this.showCurtain = false;
    this.isLoading = false;
  }

  // Connection error
  viewConnectionError() {
    this.hasConnectionError = true;
    setTimeout(() => {
      this.hasConnectionError = false;
    }, 2000);
  }

  stopConnectionError() {
    this.hasConnectionError = false;
  }
}
