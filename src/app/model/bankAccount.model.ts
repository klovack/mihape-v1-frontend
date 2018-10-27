export default class BankAccount {
  constructor(
    private _name: string,
    private _IBAN: string,
    private _country: string,
    private _accountNumber?: string,
    private _bic?: string,
    private _otherInformation?: [
      {
      name: string,
      value: string,
      }
    ],
  ) {}

  public get name() { return this._name; }
  public get accountNumber() { return this._accountNumber; }
  public get bic() { return this._bic; }
  public get country() { return this._country; }
  public get IBAN() { return this._IBAN; }
  public get otherInformation() { return this._otherInformation; }
}

