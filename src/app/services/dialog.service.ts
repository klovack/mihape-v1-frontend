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
    showIHaveTransfered: false,
    showTransactionDeleted: false,
    showRecipientDeleted: false,
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

  // Show Dialog token expired
  viewTokenExpired() {
    this.dialogMessage.tokenExpired = true;
    this.dialogMessage.show = true;
    this.prepareForClosing(this.stopTokenExpired);
  }

  stopTokenExpired() {
    this.dialogMessage.tokenExpired = false;
    this.dialogMessage.show = false;
  }

  // Show dialog to success transfered
  viewSuccessTransfered() {
    this.dialogMessage.showIHaveTransfered = true;
    this.dialogMessage.show = true;
    this.prepareForClosing(this.stopSuccessTransfered, 5000);
  }

  stopSuccessTransfered() {
    this.dialogMessage.showIHaveTransfered = false;
    this.dialogMessage.show = false;
  }

  // Show Transaction Deleted
  viewTransactionDeleted() {
    this.dialogMessage.showTransactionDeleted = true;
    this.dialogMessage.show = true;
    this.prepareForClosing(this.stopTransactionDeleted);
  }

  stopTransactionDeleted() {
    this.dialogMessage.showTransactionDeleted = false;
    this.dialogMessage.show = false;
  }

  // Show Recipient Deleted
  viewRecipientDeleted() {
    this.dialogMessage.showRecipientDeleted = true;
    this.dialogMessage.show = true;
    this.prepareForClosing(this.stopRecipientDeleted);
  }

  stopRecipientDeleted() {
    this.dialogMessage.showRecipientDeleted = false;
    this.dialogMessage.show = false;
  }

  // Delay before the dialog close
  private prepareForClosing(closingFunction: Function, timeLimit = 3000) {
    setTimeout(() => {
      closingFunction.bind(this)();
    }, timeLimit);
  }
}
