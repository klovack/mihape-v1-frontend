import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import Rates from '../model/rates.model';
import Currency, { CurrencyType } from '../model/currency.model';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  private _ratesUrl = 'http://localhost:3000/api/v1/rates';
  private _currencyTypes = [
    { name: 'EUR', type: CurrencyType.EUR },
    { name: 'IDR', type: CurrencyType.IDR },
    { name: 'USD', type: CurrencyType.USD },
  ];
  private _rates: Rates;
  private _maxTransaction = 10000000; // In Rupiah

  constructor(private http: HttpClient) {}

  convertRates(fromCurrency: Currency, destination: CurrencyType, combineWithFee: boolean): Observable<any> {
    const params = {
      base: fromCurrency.baseString,
      amount: fromCurrency.amount.toString(),
      destination: Currency.toCurrencyTypeString(destination),
      'include_fee': `${combineWithFee}`,
    };

    return this.http.get(this._ratesUrl, {
      params: params
    })
      .pipe(
        map((respond: RespondRates) => {
          this._rates = this.toRates(respond);
          return this._rates;
        })
      );
  }

  public get currencyTypes() { return this._currencyTypes; }
  public get rates() { return this._rates; }
  public get maxTransaction() { return this._maxTransaction; }

  public clearRates() {
    this._rates = null;
  }

  public isBelowMaxTransaction(toBeChecked: Number) {
    return this._maxTransaction >= toBeChecked;
  }

  private toRates(toBeConverted: RespondRates) {
    return new Rates(
      new Currency(toBeConverted.data.fromCurrency.base, toBeConverted.data.fromCurrency.originalAmount),
      new Currency(toBeConverted.data.fromCurrency.base, toBeConverted.data.fromCurrency.combineAmount),
      new Currency(toBeConverted.data.toCurrency.base, toBeConverted.data.toCurrency.originalAmount),
      new Currency(toBeConverted.data.toCurrency.base, toBeConverted.data.toCurrency.combineAmount),
      new Currency(toBeConverted.data.fromCurrency.base, toBeConverted.data.fee),
      toBeConverted.data.combineWithFee,
      new Currency(toBeConverted.data.fromCurrency.base, toBeConverted.data.total)
    );
  }
}

class RespondRates {
  message: string;
  data: {
    fromCurrency: {
      base: string,
      originalAmount: number,
      combineAmount: number,
    };
    toCurrency: {
      base: string,
      originalAmount: number,
      combineAmount: number,
    };
    toBeTransfered: {
      base: string,
      amount: number,
    };
    fee: number,
    combineWithFee: boolean,
    total: number
  };
}
