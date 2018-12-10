import Currency from './currency.model';

/*
  All properties are read-only property
*/
export default class Rates {
  constructor(
    private _fromOriginalCurrency: Currency,
    private _fromCombineCurrency: Currency,
    private _toOriginalCurrency: Currency,
    private _toCombineCurrency: Currency,
    private _fee: Currency,
    private _combineWithFee: boolean,
    private _toBeTransfered?: Currency,
    private _toFinalCurrency?: Currency
  ) {}

  get toCurrency(): Currency {
    return this._combineWithFee ? this._toCombineCurrency : this._toOriginalCurrency;
  }

  get fromCurrency(): Currency {
    return this._combineWithFee ? this._fromCombineCurrency : this._fromOriginalCurrency;
  }

  get fee(): Currency {
    return this._fee;
  }

  get combineWithFee(): boolean {
    return this._combineWithFee;
  }

  get toBeTransfered(): Currency {
    return this._toBeTransfered;
  }

  get toFinalCurrency(): Currency {
    return this._toFinalCurrency;
  }

  set combineWithFee(value: boolean) {
    this._combineWithFee = value;
  }

  get total(): Currency {
    return this._combineWithFee ?
      new Currency(this._fromCombineCurrency.base, this._fromCombineCurrency.amount + this._fee.amount) :
      new Currency(this._fromOriginalCurrency.base, this._fromOriginalCurrency.amount + this._fee.amount);
  }
}
