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
}
