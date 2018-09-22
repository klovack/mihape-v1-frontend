import BankAccount from './bankAccount.model';

export default class Recipient {
  constructor(
    private _id: string,
    private _name: string,
    private _country: string,
    private _bankAccount: BankAccount,
    private _userId: string,
  ) {}

  public get id() { return this._id; }
  public get name() { return this._name; }
  public get country() { return this._country; }
  public get bankAccount() { return this._bankAccount; }
  public get userId() { return this._userId; }
}
