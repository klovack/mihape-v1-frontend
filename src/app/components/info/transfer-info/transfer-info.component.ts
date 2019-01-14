import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Transaction from 'src/app/model/transaction.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsService } from 'src/app/services/transactions.service';
import { DialogService } from 'src/app/services/dialog.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-transfer-info',
  templateUrl: './transfer-info.component.html',
  styleUrls: ['./transfer-info.component.scss']
})
export class TransferInfoComponent implements OnInit {

  transaction: Transaction;
  faLeft = faArrowLeft;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _transactionsService: TransactionsService,
    private _router: Router,
  ) { }

  ngOnInit() {
    const params = this._activatedRoute.snapshot.params;
    if (params.transactionId) {
      this._transactionsService.getTransactionById(params.transactionId)
        .toPromise()
        .then(promiseTransaction => {
          return promiseTransaction;
        })
        .then(transaction => {
          this.transaction = transaction;
        })
        .catch((err) => {
          console.log(err);
          this._router.navigate(['/bank-accounts']);
        });
    }
  }

  goBack() {
    if (this.transaction) {
      this._router.navigate(['overview', 'transactions', this.transaction.id]);
    } else {
      this._router.navigate(['/overview']);
    }
  }
}
