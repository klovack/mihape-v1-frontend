import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Router } from '@angular/router';
import Transaction from 'src/app/model/transaction.model';

@Component({
  selector: 'app-transactions-new-overview',
  templateUrl: './transactions-new-overview.component.html',
  styleUrls: ['./transactions-new-overview.component.scss']
})
export class TransactionsNewOverviewComponent implements OnInit {

  createdTransaction: Transaction;

  constructor(
    private _transactionsService: TransactionsService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.createdTransaction = this._transactionsService.prepareTransaction(null);
    if (!!this.createdTransaction.name || this.createdTransaction.name.length <= 0) {
      this._transactionsService.clearPreparedTransaction();
    }
    console.log(this.createdTransaction);
  }

}
