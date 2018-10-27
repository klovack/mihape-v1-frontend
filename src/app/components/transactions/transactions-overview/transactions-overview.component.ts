import { Component, OnInit, OnDestroy } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TransactionsService } from 'src/app/services/transactions.service';
import { DialogService } from 'src/app/services/dialog.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transactions-overview',
  templateUrl: './transactions-overview.component.html',
  styleUrls: ['./transactions-overview.component.scss']
})
export class TransactionsOverviewComponent implements OnInit, OnDestroy {

  transactions = [];
  faPlus = faPlus;
  private _subscription: Subscription;

  constructor(
    private _transactionsService: TransactionsService,
    private _dialogService: DialogService,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._updateTransactions();
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

  private _updateTransactions() {
    this._subscription = this._transactionsService.getAllTransactions().subscribe(
      (data) => {
        data.then(
          (trx) => {
            this.transactions = trx;
          })
          .catch(
            (err) => {
              console.log(err);
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
