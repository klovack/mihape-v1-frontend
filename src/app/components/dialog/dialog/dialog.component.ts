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
  showHoldToDelete = false;

  constructor(private _dialogService: DialogService) { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.showMaxLimit = this._dialogService.dialogMessage.showMaxLimit;
    this.showUndeletableRecipient = this._dialogService.dialogMessage.showUndeletableRecipient;
    this.showHoldToDelete = this._dialogService.dialogMessage.showHoldToDelete;
  }

}
