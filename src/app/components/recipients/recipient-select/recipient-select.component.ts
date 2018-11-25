import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import Recipient from 'src/app/model/recipients.model';
import { RecipientsService } from 'src/app/services/recipients.service';
import { DialogService } from 'src/app/services/dialog.service';
import { Subscription } from 'rxjs';
import { MatSelect } from '@angular/material';

@Component({
  selector: 'app-recipient-select',
  templateUrl: './recipient-select.component.html',
  styleUrls: ['./recipient-select.component.scss']
})
export class RecipientSelectComponent implements OnInit, OnDestroy {

  @Output('recipientSelect') recipientSelect = new EventEmitter<Recipient>();

  recipients: Recipient[];
  subscription: Subscription;

  constructor(private _recipientsService: RecipientsService, private _dialogService: DialogService) { }

  ngOnInit() {
    this.subscription = this._recipientsService.getAllRecipients()
      .subscribe(
        (data) => {
          this.recipients = data;
        },
        (err) => {
          this._dialogService.viewConnectionError();
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRecipientSelect(selectRecipientElement: MatSelect) {
    for (let i = 0; i < this.recipients.length; i++) {
      const element = this.recipients[i];
      if (element.id === selectRecipientElement.value) {
        this.recipientSelect.emit(element);
      }
    }
  }

}
