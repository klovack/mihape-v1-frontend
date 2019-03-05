import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { RatesService } from '../../../services/rates.service';
import Rates from '../../../model/rates.model';
import Currency, { CurrencyType } from '../../../model/currency.model';
import { DialogService } from '../../../services/dialog.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rates-converter',
  templateUrl: './rates-converter.component.html',
  styleUrls: ['./rates-converter.component.scss']
})
export class RatesConverterComponent implements OnInit, OnDestroy {

  private _combineFeeBeforeValue = false;
  private _initialFromCurrency = new Currency(CurrencyType.IDR, 1000000);
  private _initialToCurrency = new Currency(CurrencyType.EUR, 1);
  private _subscription: Subscription = new Subscription;
  _converterForm = new FormGroup({
    fromAmount: new FormControl(this._initialFromCurrency.amount, Validators.required),
    fromBase: new FormControl(this._initialFromCurrency.baseString, Validators.required),
    toAmount: new FormControl(this._initialToCurrency.amount, Validators.required),
    toBase: new FormControl(this._initialToCurrency.baseString),
    combineFee: new FormControl(false),
  });

  currencyTypes: any[];
  isLoading = false;
  errorMessage = '';
  combineTooltip = false;
  faInfo = faInfoCircle;
  showEstimationDesc = false;

  ratesService: RatesService;

  private requestTry = 0;
  private maxRequestTry = 3;

  constructor(
    _ratesService: RatesService,
    private _dialogService: DialogService,
    private _authService: AuthService,
    private _router: Router
    ) {
    this.ratesService = _ratesService;
    this.currencyTypes = this.ratesService.currencyTypes;
  }

  ngOnInit() {
    this.requestTry = 0;
    if (this.ratesService.rates) {
      this.populateForm(this.ratesService.rates);
    } else {
      this.onConvert();
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  get fromAmount() { return this._converterForm.get('fromAmount'); }
  get fromBase() { return this._converterForm.get('fromBase'); }
  get toAmount() { return this._converterForm.get('toAmount'); }
  get toBase() { return this._converterForm.get('toBase'); }
  get combineFee() { return this._converterForm.get('combineFee'); }

  onConvert() {
    this.isLoading = true;
    // If user enter string of non numerical characters
    this.checkForValidInput();
    // If user entered more than max transaction
    this.checkForMaxTransaction();
    // If user entered less than min transaction
    this.checkForMinTransaction();

    // If user wants to switch between combine fee or not
    if (this._combineFeeBeforeValue !== this.combineFee.value) {
      this.isLoading = false;
      return this.onCombineChange();
    }
    this._subscription = this.ratesService.convertRates(
      new Currency(this.fromBase.value, this.fromAmount.value),
      Currency.toCurrencyType(this.toBase.value),
      this.combineFee.value,
    )
    .subscribe((result: Rates) => {
      this.populateForm(result);
      this.isLoading = false;
    },
    err => {
      this.requestTry += 1;

      if (this.requestTry < this.maxRequestTry) {
        // console.log('retry');
        setTimeout((() => {
          this.onConvert();
        }).bind(this), 500 * this.requestTry);
      } else {
        this.isLoading = false;
        this.showNoConnectionError();
      }
    });
  }

  onShowEstimationDesc() {
    // console.log('show');
    this.showEstimationDesc = true;
  }

  onHideEstimationDesc() {
    // console.log('hide');
    this.showEstimationDesc = false;
  }

  private checkForValidInput() {
    if (typeof this.fromAmount.value === 'string' && isNaN(Number(Currency.parseCurrency(this.fromAmount.value)))) {
      this.fromAmount.setValue('1000000');
    }
  }

  /**
   * Temporary function to limit the transaction
   * Later should implement more robust max transaction
   * with the limit that can be injected
   */
  private checkForMaxTransaction() {
    if (!this.ratesService.isBelowMaxTransaction(Number(Currency.parseCurrency(this.fromAmount.value.toString())))) {
      if (this._router.url.includes('transactions/new')) {
        this._dialogService.viewMaxLimit();
        this.fromAmount.setValue(this.ratesService.maxTransaction);
      }
    }
  }

  /**
   * Temporary function to limit the transaction
   * Later should implement more robust max transaction
   * with the limit that can be injected
   */
  private checkForMinTransaction() {
    if (!this.ratesService.isAboveMinTransaction(Number(Currency.parseCurrency(this.fromAmount.value.toString())))) {
      this._dialogService.viewMinLimit();
      this.fromAmount.setValue(this.ratesService.minTransaction);
    }
  }


  onCombineChange() {
    this.ratesService.rates.combineWithFee = this.combineFee.value;
      this.populateForm(this.ratesService.rates);
      return;
  }

  /*
    If user is logged in, send the created rates to the next step in transaction
    Otherwise send user to logged in
  */
  onSend() {
    // If user is logged in, redirect it to new transaction.
    if (this._authService.isUserLoggedIn) {
      this._router.navigate(['/overview/transactions/new/recipient']);
    } else {
      // Otherwise show login form
      this._dialogService.viewSignin('/overview/transactions/new');
    }
  }

  populateForm(result: Rates) {
    if (result) {
      this.fromAmount.setValue(Currency.toCurrencyString(result.fromCurrency));
      this.toAmount.setValue(Currency.toCurrencyString(result.toCurrency));
      this._combineFeeBeforeValue = result.combineWithFee;
      this.combineFee.setValue(this._combineFeeBeforeValue);
    }
  }

  showNoConnectionError() {
    this._dialogService.viewConnectionError();
  }

  showCombineTooltip() {
    this.combineTooltip = true;
  }

  hideCombineTooltip() {
    this.combineTooltip = false;
  }
}
