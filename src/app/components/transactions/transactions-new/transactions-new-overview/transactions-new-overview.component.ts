import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service';
import { ActivatedRoute, Router } from '@angular/router';
import Transaction from 'src/app/model/transaction.model';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { faInfoCircle, faArrowLeft, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transactions-new-overview',
  templateUrl: './transactions-new-overview.component.html',
  styleUrls: ['./transactions-new-overview.component.scss']
})
export class TransactionsNewOverviewComponent implements OnInit, OnDestroy {

  createdTransaction: Transaction;
  isNewTransaction = true;
  faInfo = faInfoCircle;
  faLeft = faArrowLeft;
  faCheck = faCheck;
  faTimes = faTimes;
  isConfirming = false;

  subscription: Subscription;

  constructor(
    private _transactionsService: TransactionsService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _dialogService: DialogService,
  ) { }

  ngOnInit() {
    const trxId = this._route.snapshot.paramMap.get('id');

    // Handle if this component is being called when creating the new transaction
    // Or when showing the detail of the transaction
    if (!trxId) {
      this.createdTransaction = this._transactionsService.prepareTransaction(null);
      if (!this.createdTransaction.name || this.createdTransaction.name.length <= 0) {
        this._transactionsService.clearPreparedTransaction();
      }
    } else {
      this.isNewTransaction = false;
      // Get the transaction with the given id
      this.updateTransaction(trxId);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onCreateTransaction() {
    this._dialogService.startLoading();
    this._transactionsService.postNewlyCreatedTransaction()
      .then((data) => {
        this._dialogService.stopLoading();
        this._router.navigate(['/bank-accounts', data._id]);
      })
      .catch(() => {
        this._dialogService.stopLoading();
        this._dialogService.viewConnectionError();
      });
  }

  onHaveTransfered() {
    this._dialogService.startLoading();
    this._transactionsService.onMoneyIsTransfered(this.createdTransaction).subscribe(
      () => {
        this.updateTransaction(this.createdTransaction.id);
        this._dialogService.stopLoading();
        this._dialogService.viewSuccessTransfered();
      },
      () => {
        this._dialogService.viewConnectionError();
      }
    );
  }

  onPrepareCancelTransaction() {
    this.isConfirming = true;
  }

  onUnprepareCancelTransaction() {
    this.isConfirming = false;
  }

  onMouseLeavePrepareTransaction(timeout = 500) {
    if (this.isConfirming) {
      setTimeout(() => {
        this.onUnprepareCancelTransaction.bind(this)();
      }, timeout);
    }
  }

  onCancelTransaction() {
    this._dialogService.startLoading();
    this._transactionsService.deleteTransaction(this.createdTransaction).toPromise()
    .then(
        () => {
          this.updateTransaction(this.createdTransaction.id);
          this._dialogService.stopLoading();
        }
      )
    .catch(
      () => {
        this._dialogService.stopLoading();
        this._dialogService.viewConnectionError();
      }
    );
  }

  private updateTransaction(trxId) {
    this.subscription = this._transactionsService.getTransactionById(trxId).subscribe(
      (response) => {
        response
        .then((data: Transaction) => {
          this.createdTransaction = data;
        })
        .catch(err => {
          this._router.navigate(['transaction']);
        });
      }
    );
  }
}
