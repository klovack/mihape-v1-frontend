import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Transaction from 'src/app/model/transaction.model';

@Component({
  selector: 'app-transactions-detail',
  templateUrl: './transactions-detail.component.html',
  styleUrls: ['./transactions-detail.component.scss']
})
export class TransactionsDetailComponent implements OnInit {

  @Input('transaction') transaction: Transaction;
  @Input('showRecipient') showRecipient = true;
  @Input('deletable') deletable = true;
  @Input('alwaysShowAll') alwaysShowAll = false;
  @Input('expanded') expanded = false;
  @Input('showCreated') showCreated = true;
  @Input('showDeadline') showDeadline = true;
  @Input('showAmount') showAmount = true;
  @Input('showMore') showMore = false;
  @Output('deleteTrx') deleteTrx = new EventEmitter<Transaction>();
  @Output('holdToDeleteEvent') holdToDeleteEvent = new EventEmitter<any>();

  deleteTimeoutHandler: any;
  showDetail = false;
  faTrash = faTrashAlt;

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

  prepareToDelete() {
    const deleteIcon = document.getElementById('delete-icon');
    deleteIcon.classList.add('deleting');
    this.deleteTimeoutHandler = setTimeout(() => {
      this.deleteTrx.emit(this.transaction);
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
