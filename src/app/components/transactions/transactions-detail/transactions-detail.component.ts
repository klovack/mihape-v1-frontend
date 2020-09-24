import { Component, OnInit, Input } from '@angular/core';
import { faTrashAlt, faClock, faFileImport, faFileExcel, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
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

  get faStatus() {
    switch (this.transaction.status) {
      case 'IS_PROCESSED':
        return faClock;
      case 'IS_CANCELED':
      case 'SENT_BACK':
        return faTimes;
      case 'IS_RECEIVED':
        return faFileImport;
      case 'IS_FAILED':
        return faFileExcel;
      case 'IS_COMPLETED':
        return faCheck;
      default:
        return faClock;
    }
  }
}
