import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Transaction from 'src/app/model/transaction.model';

@Component({
  selector: 'app-transactions-detail',
  templateUrl: './transactions-detail.component.html',
  styleUrls: ['./transactions-detail.component.scss']
})
export class TransactionsDetailComponent implements OnInit {

  @Input('transaction') transaction;
  @Output('deleteTrx') deleteTrx = new EventEmitter<Transaction>();
  showDetail = false;
  faTimes = faTimesCircle;

  constructor() { }

  ngOnInit() {
  }

  onShowDetail() {
    this.showDetail = !this.showDetail;
  }

  onDelete() {
    this.deleteTrx.emit(this.transaction);
  }

}
