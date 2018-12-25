import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import Recipient from '../../../model/recipients.model';
import { faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipients-detail',
  templateUrl: './recipients-detail.component.html',
  styleUrls: ['./recipients-detail.component.scss']
})
export class RecipientsDetailComponent implements OnInit {

  @Input('recipient') recipient: Recipient;
  @Input('deletable') deletable = true;
  @Input('alwaysShowAll') alwaysShowAll = false;
  @Input('expanded') expanded = false;
  @Output('deleteRecipient') deleteRecipient = new EventEmitter<Recipient>();
  @Output('holdToDeleteEvent') holdToDeleteEvent = new EventEmitter<any>();
  faTrash = faTrashAlt;
  faCheck = faCheck;
  faTimes = faTimes;

  showDetail = false;
  hasConfirmation = false;

  constructor() { }

  ngOnInit() {
    if (this.alwaysShowAll || this.expanded) {
      this.showDetail = true;
    } else {
      this.showDetail = false;
    }
  }

  onShowDetail() {
    if (!this.alwaysShowAll) {
      this.showDetail = !this.showDetail;
    }
  }

  get lastDigitNumber() {
    const accountNumber = this.recipient.bankAccount.accountNumber;
    return accountNumber.substring(accountNumber.length - 4);
  }

  prepareToDelete() {
    this.hasConfirmation = true;
  }

  cancelDelete() {
    this.hasConfirmation = false;
  }

  onDelete() {
    this.deleteRecipient.emit(this.recipient);
  }

  onMouseLeavingDelete(timeout = 500) {
    setTimeout(() => {
      this.cancelDelete.bind(this)();
    }, timeout);
  }
}
