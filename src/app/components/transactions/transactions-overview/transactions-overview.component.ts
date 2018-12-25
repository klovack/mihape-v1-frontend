import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TransactionsService } from 'src/app/services/transactions.service';
import { DialogService } from 'src/app/services/dialog.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transactions-overview',
  templateUrl: './transactions-overview.component.html',
  styleUrls: ['./transactions-overview.component.scss']
})
export class TransactionsOverviewComponent implements OnInit, OnDestroy, OnChanges {

  transactions = [];
  faPlus = faPlus;
  faLeft = faArrowLeft;
  onOwnRoute = false;
  private _subscription: Subscription;

  constructor(
    private _transactionsService: TransactionsService,
    private _dialogService: DialogService,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.onOwnRoute = this._activatedRoute.snapshot.url.toString().includes('transactions');
    this._updateTransactions();
  }

  ngOnChanges() {
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  deleteTrx(event) {
    this._dialogService.startLoading();
    this._transactionsService.deleteTransaction(event)
      .toPromise()
      .then(() => {
        this._dialogService.stopLoading();
        this._updateTransactions();
      })
      .catch((err) => {
        if (err.status !== 404) {
          this._dialogService.viewConnectionError();
        }
        this._dialogService.stopLoading();
      });
  }

  showHoldToDeleteWarning() {
    this._dialogService.viewHoldToDelete();
  }

  private _updateTransactions() {
    const limit = this.onOwnRoute ? null : 3;
    this._subscription = this._transactionsService.getAllTransactions(limit).subscribe(
      (data) => {
        data.then(
          (trx) => {
            this.transactions = trx;
          })
          .catch(
            (err) => {
              this._dialogService.viewConnectionError();
            }
          );
      },
      (err) => {
        this.transactions = [];
        if (err.status !== 404) {
          this._dialogService.viewConnectionError();
        }
      }
    );
  }

  get canBack() {
    return this._activatedRoute.snapshot.url[0].path === 'transactions';
  }

  get showMore() {
    return this.transactions.length > 0 && this._activatedRoute.snapshot.url[0].path !== 'transactions';
  }
}
