import { Component, OnChanges, DoCheck, OnDestroy } from '@angular/core';
import { RatesService } from 'src/app/services/rates.service';
import { RecipientsService } from 'src/app/services/recipients.service';
import { Router } from '@angular/router';
import { faTimes, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-transactions-new',
  templateUrl: './transactions-new.component.html',
  styleUrls: ['./transactions-new.component.scss']
})
export class TransactionsNewComponent implements DoCheck, OnDestroy {

  conditions = {
    hasRates: false,
    hasRecipients: false,
    hasData: false,
  };

  faTimes = faTimes;
  faLeft = faArrowLeft;
  faRight = faArrowRight;

  backUrl = 'new';
  forwardUrl = '';

  constructor(
    private _ratesService: RatesService,
    private _recipientsService: RecipientsService,
    private _transactionsService: TransactionsService,
    private _router: Router
  ) { }

  ngDoCheck() {
    this.conditions.hasRates = !!this._ratesService.rates;
    this.conditions.hasRecipients = !!this._recipientsService.chosenRecipient;
    this.conditions.hasData = !!this._transactionsService.newlyCreatedTransaction;

    const url = `/overview/transactions/new`;
    switch (this._router.url) {
      case `${url}/rates`:
        this.backUrl = null;
        this.forwardUrl = this.conditions.hasRates ? 'recipient' : '';
        break;
      case `${url}/recipient`:
        this.backUrl = 'rates';
        this.forwardUrl = this.conditions.hasRecipients ? 'data' : '';
        break;
      case `${url}/data`:
        this.backUrl = 'recipient';
        this.forwardUrl = this.conditions.hasData ? 'overview' : '';
        break;
      case `${url}/overview`:
        this.backUrl = 'data';
        this.forwardUrl = '';
        break;
      default:
        this.backUrl = '';
        this.forwardUrl = '';
        break;
    }
  }

  ngOnDestroy() {
    this._ratesService.clearRates();
    this._recipientsService.clearChosenRecipient();
    this._transactionsService.clearPreparedTransaction();
  }

  onGoNext() {
    // if (this._router.url === `/transactions/new/data`) {
    //   this._transactionsService.prepareTransaction(null);
    // }

    this._router.navigate(['/overview/transactions/new', this.forwardUrl]);
  }
}
