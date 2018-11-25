import { Component, OnInit } from '@angular/core';
import Recipient from 'src/app/model/recipients.model';
import { RecipientsService } from 'src/app/services/recipients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions-add-recipients',
  templateUrl: './transactions-add-recipients.component.html',
  styleUrls: ['./transactions-add-recipients.component.scss']
})
export class TransactionsAddRecipientsComponent implements OnInit {

  canAddNewRecipient = false;

  constructor(private _recipientsService: RecipientsService, private _router: Router) { }

  ngOnInit() {
  }

  onAbleToAddRecipient(addRecipient: HTMLInputElement) {
    this.canAddNewRecipient = addRecipient.checked;
  }

  onSelectRecipient(recipient: Recipient) {
    this._recipientsService.chooseRecipient(recipient);
    this._router.navigate(['/transactions/new/data']);
  }

}
