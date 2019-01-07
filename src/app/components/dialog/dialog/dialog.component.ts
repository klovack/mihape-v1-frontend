import { Component, OnInit, DoCheck } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, DoCheck {

  showMaxLimit = false;
  showUndeletableRecipient = false;
  showIHaveTransfered = false;
  tokenExpired = false;
  showMinLimit = false;
  showTransactionDeleted = false;
  showRecipientDeleted = false;

  constructor(private _dialogService: DialogService) { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.showMaxLimit = this._dialogService.dialogMessage.showMaxLimit;
    this.showMinLimit = this._dialogService.dialogMessage.showMinLimit;
    this.showUndeletableRecipient = this._dialogService.dialogMessage.showUndeletableRecipient;
    this.tokenExpired = this._dialogService.dialogMessage.tokenExpired;
    this.showIHaveTransfered = this._dialogService.dialogMessage.showIHaveTransfered;
    this.showTransactionDeleted = this._dialogService.dialogMessage.showTransactionDeleted;
    this.showRecipientDeleted = this._dialogService.dialogMessage.showRecipientDeleted;
  }

  get showError() {
    return this.showMaxLimit || this.showMinLimit || this.tokenExpired || this.showUndeletableRecipient;
  }

  get showSuccess() {
    return this.showIHaveTransfered;
  }

}
