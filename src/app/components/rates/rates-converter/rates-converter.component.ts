import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { RatesService } from '../../../services/rates.service';
import Rates from '../../../model/rates.model';
import Currency, { CurrencyType } from '../../../model/currency.model';
import { DialogService } from '../../../services/dialog.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

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
  private _converterForm = new FormGroup({
    fromAmount: new FormControl(this._initialFromCurrency.amount, Validators.required),
    fromBase: new FormControl(this._initialFromCurrency.baseString, Validators.required),
    toAmount: new FormControl(this._initialToCurrency.amount, Validators.required),
    toBase: new FormControl(this._initialToCurrency.baseString),
    combineFee: new FormControl(false),
  });

  currencyTypes = this._ratesService.currencyTypes;
  isLoading = false;
  errorMessage = '';
  combineTooltip = false;

  constructor(
    private _ratesService: RatesService,
    private _dialogService: DialogService,
    private _authService: AuthService,
    private _router: Router
    ) {}

  ngOnInit() {
    if (this._ratesService.rates) {
      this.populateForm(this._ratesService.rates);
    }
    this.onConvert();
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

    // If user wants to switch between combine fee or not
    if (this._combineFeeBeforeValue !== this.combineFee.value) {
      this.isLoading = false;
      return this.onCombineChange();
    }
    this._subscription = this._ratesService.convertRates(
      new Currency(this.fromBase.value, this.fromAmount.value),
      Currency.toCurrencyType(this.toBase.value),
      this.combineFee.value,
    )
    .subscribe((result: Rates) => {
      this.populateForm(result);
      this.isLoading = false;
    },
    err => {
      this.isLoading = false;
      this.showNoConnectionError();
    });
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
    if (!this._ratesService.isBelowMaxTransaction(Number(Currency.parseCurrency(this.fromAmount.value.toString())))) {
      if (this._router.url.includes('transactions/new')) {
        this._dialogService.viewMaxLimit();
        this.fromAmount.setValue(this._ratesService.maxTransaction);
      }
    }
  }

  onCombineChange() {
    this._ratesService.rates.combineWithFee = this.combineFee.value;
      this.populateForm(this._ratesService.rates);
      return;
  }

  /*
    If user is logged in, send the created rates to the next step in transaction
    Otherwise send user to logged in
  */
  onSend() {
    // If user is logged in, redirect it to new transaction.
    if (this._authService.isUserLoggedIn) {
      this._router.navigate(['/transactions/new/recipient']);
    } else {
      // Otherwise show login form
      this._dialogService.viewSignin('/transactions/new');
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
