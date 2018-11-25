import { Component, OnChanges, DoCheck, OnDestroy } from '@angular/core';
import { RatesService } from 'src/app/services/rates.service';
import { RecipientsService } from 'src/app/services/recipients.service';
import { Router } from '@angular/router';

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

  backUrl = 'new';

  constructor(
    private _ratesService: RatesService,
    private _recipientsService: RecipientsService,
    private _router: Router
  ) { }

  ngDoCheck() {
    this.conditions.hasRates = !!this._ratesService.rates;
    this.conditions.hasRecipients = !!this._recipientsService.chosenRecipient;
    this.conditions.hasData = false;

    const url = `/transactions/new`;
    switch (this._router.url) {
      case `${url}/rates`:
        this.backUrl = null;
        break;
      case `${url}/recipient`:
        this.backUrl = 'rates';
        break;
      case `${url}/data`:
        this.backUrl = 'recipient';
        break;
      case `${url}/overview`:
        this.backUrl = 'data';
        break;
      default:
        this.backUrl = '';
        break;
    }
  }

  ngOnDestroy() {
    this._ratesService.clearRates();
    this._recipientsService.clearChosenRecipient();
  }

}
