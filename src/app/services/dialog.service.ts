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
  nextNavigation = '';

  dialogMessage = {
    show: false,
    showUndeletableRecipient: false,
    showMaxLimit: false,
    showMinLimit: false,
    tokenExpired: false,
  };

  constructor() { }

  // Signin
  closeSignin() {
    this.showSignin = false;
  }

  viewSignin(nextNavigation?: string) {
    this.showSignin = true;
    this.nextNavigation = nextNavigation;
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
    this.prepareForClosing(this.stopConnectionError, 5000);
  }

  stopConnectionError() {
    this.hasConnectionError = false;
  }

  // Show Dialog Error
  viewUndeletableRecipientError() {
    this.dialogMessage.showUndeletableRecipient = true;
    this.dialogMessage.show = true;
    this.prepareForClosing(this.stopUndeletableRecipientError);
  }

  stopUndeletableRecipientError() {
    this.dialogMessage.showUndeletableRecipient = false;
    this.dialogMessage.show = false;
  }

  // Show Dialog Max Limit Error
  viewMaxLimit() {
    this.dialogMessage.showMaxLimit = true;
    this.dialogMessage.show = true;
    this.prepareForClosing(this.stopMaxLimit);
  }

  stopMaxLimit() {
    this.dialogMessage.showMaxLimit = false;
    this.dialogMessage.show = false;
  }

  // Show Dialog Min Limit Error
  viewMinLimit() {
    this.dialogMessage.showMinLimit = true;
    this.dialogMessage.show = true;
    this.prepareForClosing(this.stopMinLimit);
  }

  stopMinLimit() {
    this.dialogMessage.showMinLimit = false;
    this.dialogMessage.show = false;
  }

  // Show Dialog Hold To Delete
  viewTokenExpired() {
    this.dialogMessage.tokenExpired = true;
    this.dialogMessage.show = true;
    this.prepareForClosing(this.stopTokenExpired);
  }

  stopTokenExpired() {
    this.dialogMessage.tokenExpired = false;
    this.dialogMessage.show = false;
  }

  // Delay before the dialog close
  private prepareForClosing(closingFunction: Function, timeLimit = 3000) {
    setTimeout(() => {
      closingFunction.bind(this)();
    }, timeLimit);
  }
}
