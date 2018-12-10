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
    this.prepareForClosing(this.stopConnectionError);
  }

  stopConnectionError() {
    this.hasConnectionError = false;
  }

  // Show Dialog Error
  viewUndeletableRecipientError() {
    this.dialogMessage.show = true;
    this.dialogMessage.showUndeletableRecipient = true;
    this.prepareForClosing(this.stopUndeletableRecipientError);
  }

  stopUndeletableRecipientError() {
    this.dialogMessage.showUndeletableRecipient = false;
    this.dialogMessage.show = false;
  }

  // Show Dialog Max Limit Error
  viewMaxLimit() {
    this.dialogMessage.show = true;
    this.dialogMessage.showMaxLimit = true;
    this.prepareForClosing(this.stopUndeletableRecipientError);
  }

  stopMaxLimit() {
    this.dialogMessage.showMaxLimit = false;
    this.dialogMessage.show = false;
  }

  // Delay before the dialog close
  private prepareForClosing(closingFunction: Function) {
    setTimeout(() => {
      closingFunction.bind(this)();
    }, 2000);
  }
}
