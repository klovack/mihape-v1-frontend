import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import Recipient from '../../../model/recipients.model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
  faTrash = faTrash;

  showDetail = false;
  deleteTimeoutHandler: any;

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
    const deleteIcon = document.getElementById('delete-icon');
    deleteIcon.classList.add('deleting');
    this.deleteTimeoutHandler = setTimeout(() => {
      this.deleteRecipient.emit(this.recipient);
      this.deleteTimeoutHandler = null;
    }, 1000);
  }

  cancelDelete() {
    const deleteIcon = document.getElementById('delete-icon');
    // Check to see if item is not yet deleted
    if (deleteIcon) {
      deleteIcon.classList.remove('deleting');
    }
    if (this.deleteTimeoutHandler) {
      clearTimeout(this.deleteTimeoutHandler);
      this.deleteTimeoutHandler = null;
      this.holdToDeleteEvent.emit();
    }
  }
}
