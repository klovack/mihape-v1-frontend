import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import Recipient from '../../../model/recipients.model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from 'src/app/services/dialog.service';
import { RecipientsService } from 'src/app/services/recipients.service';

@Component({
  selector: 'app-recipients-detail',
  templateUrl: './recipients-detail.component.html',
  styleUrls: ['./recipients-detail.component.scss']
})
export class RecipientsDetailComponent implements OnInit {

  @Input('recipient') recipient: Recipient;
  @Output('deleteRecipient') deleteRecipient = new EventEmitter<Recipient>();
  faTrash = faTrash;

  showDetail = false;

  constructor() { }

  ngOnInit() {
    this.showDetail = false;
  }

  onShowDetail() {
    this.showDetail = !this.showDetail;
  }

  get lastDigitNumber() {
    const accountNumber = this.recipient.bankAccount.accountNumber;
    return accountNumber.substring(accountNumber.length - 4);
  }

  onDelete() {
    this.deleteRecipient.emit(this.recipient);
  }
}
