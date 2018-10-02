import Address from './address.model';
import BankAccount from './bankAccount.model';

export default class User {
  constructor(
    private _id: string,
    private _firstName: string,
    private _lastName: string,
    private _dateOfBirth: Date,
    private _email: string,
    private _address: Address,
    private _password?: string,
    private _status?: string,
    private _phoneNumber?: string,
    private _bankAccount?: BankAccount,
    private _recipients?: [string],
    private _transactions?: [string],
  ) {}

  public get id() { return this._id; }
  public get firstName() { return this._firstName; }
  public get lastName() { return this._lastName; }
  public get dateOfBirth() { return this._dateOfBirth; }
  public get email() { return this._email; }
  public get phoneNumber() { return this._phoneNumber; }
  public get address() { return this._address; }
  public get bankAccount() { return this._bankAccount; }
  public get recipients() { return this._recipients; }
  public get transactions() { return this._transactions; }
  public get status() { return this._status; }
  public get password() { return this._password; }

  public toJSON() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth.toISOString(),
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber,
      address: this.address.toJSON(),
    };

    return user;
  }
}
