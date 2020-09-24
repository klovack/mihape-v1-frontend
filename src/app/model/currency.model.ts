export enum CurrencyType {
  EUR, IDR, USD
}

export default class Currency {
  private _base: CurrencyType;
  private _amount: number;

  constructor(base: string | CurrencyType, amount: number | string) {
    if (typeof base === 'string') {
      this._base = Currency.toCurrencyType(<string>base);
    } else {
      this._base = base;
    }

    if (typeof amount === 'string') {
      this._amount = Currency.parseCurrency(amount);
    } else {
      this._amount = amount;
    }
  }

  public static toCurrencyString(toBeConverted: Currency) {
    return toBeConverted.amount.toLocaleString(undefined, {
      maximumFractionDigits: 2, minimumFractionDigits: 2, style: 'decimal',
    });
  }

  public static toCurrencyTypeString(toBeConverted: CurrencyType) {
    switch (toBeConverted) {
      case CurrencyType.EUR: return 'EUR';
      case CurrencyType.IDR: return 'IDR';
      case CurrencyType.USD: return 'USD';
      default: throw new Error('Currency Type is not one of valid type');
    }
  }

  public static toCurrencyType(currencyTypeString: string | number): CurrencyType {
    switch (currencyTypeString) {
      case 0:
      case 'EUR': return CurrencyType.EUR;
      case 1:
      case 'IDR': return CurrencyType.IDR;
      case 2:
      case 'USD': return CurrencyType.USD;
      default: throw new Error('Currency Type is not one of valid type');
    }
  }

  /**
    Parse currency string to number.
    This function assumes that the string contains only number and has only 2 decimals.
    Otherwise it will return NaN.
  */
  public static parseCurrency(toBeParsed: string) {
    if (toBeParsed.includes('.') || toBeParsed.includes(',')) {
      const int = Number.parseInt(toBeParsed.slice(0, toBeParsed.length - 3)
      .split(',').join('')
      .split('.').join(''), 10);
      const decimal = Number.parseInt(toBeParsed.slice(toBeParsed.length - 2), 10) / 100;
      return int + decimal;
    }

    return Number.parseFloat(toBeParsed);
  }

  public get base() {
    return this._base;
  }

  public get baseString() {
    return Currency.toCurrencyTypeString(this._base);
  }

  public get amount() {
    return this._amount;
  }
}
