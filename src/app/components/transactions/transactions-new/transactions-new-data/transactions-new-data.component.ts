import { Component, OnInit } from '@angular/core';
import { TransactionPurposes } from 'src/app/model/transaction.model';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions-new-data',
  templateUrl: './transactions-new-data.component.html',
  styleUrls: ['./transactions-new-data.component.scss']
})
export class TransactionsNewDataComponent implements OnInit {

  transactionPurposes = TransactionPurposes;

  faInfo = faInfoCircle;
  doShowDescription = false;
  data = {
    paymentDetails: '',
    purpose: ''
  };

  constructor(private _transactionsService: TransactionsService, private _router: Router) { }

  ngOnInit() {
    if (this._transactionsService.newlyCreatedTransaction) {
      this.data = {
        paymentDetails: this._transactionsService.newlyCreatedTransaction.description,
        purpose: this._transactionsService.newlyCreatedTransaction.name
      };
    }
  }

  showDesc() {
    this.doShowDescription = !this.doShowDescription;
  }

  onSubmit() {
    if (this.data.purpose !== '') {
      this._transactionsService.prepareTransaction(this.data.purpose, this.data.paymentDetails);
      this._router.navigate(['transactions', 'new', 'overview']);
    }
  }

}
