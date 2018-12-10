import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, OnChanges } from '@angular/core';
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
export class RecipientSelectComponent implements OnDestroy, OnChanges {

  @Output('recipientSelect') recipientSelect = new EventEmitter<Recipient>();
  @Input('disabled') disabled: boolean;

  recipients: Recipient[];
  subscription: Subscription;
  chosenRecipientId: string;

  constructor(private _recipientsService: RecipientsService, private _dialogService: DialogService) { }

  ngOnChanges() {
    this.subscription = this._recipientsService.getAllRecipients()
      .subscribe(
        (data) => {
          this.recipients = data;
          if (this._recipientsService.chosenRecipient) {
            this.chosenRecipientId = this._recipientsService.chosenRecipient.id;
            this.onRecipientSelect(null);
          }
        },
        (err) => {
          this.disabled = true;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRecipientSelect(selectRecipientElement?: MatSelect) {
    for (let i = 0; i < this.recipients.length; i++) {
      const element = this.recipients[i];

      // Check if this method is called when selecting recipient or from initializing the page
      let recipient = '';
      if (selectRecipientElement) {
        recipient = selectRecipientElement.value;
      } else {
        recipient = this.chosenRecipientId;
      }

      if (element.id === recipient) {
        this.recipientSelect.emit(element);
      }
    }
  }

}
