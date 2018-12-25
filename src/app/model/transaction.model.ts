import * as moment from 'moment';

import Rates from './rates.model';
import Recipient from './recipients.model';

export default class Transaction {
  constructor(
    private _id: string,
    private _name: string,
    private _desc: string,
    private _createdAt: Date,
    private _deadlineAt: Date,
    private _receivedAt: Date,
    private _canceledAt: Date,
    private _completedAt: Date,
    private _failedAt: [any],
    private _status: string,
    private _rates: Rates,
    private _userId: string,
    private _recipient: Recipient,
  ) {}

  public get id() { return this._id; }
  public get name() { return this._name; }
  public get description() { return this._desc; }
  public get createdAt() { return this._createdAt; }
  public get createdAtFromNow() { return moment(this._createdAt).fromNow(); }
  public get deadlineAt() { return this._deadlineAt; }
  public get deadlineAtFromNow() { return moment(this._deadlineAt).fromNow(); }
  public get receivedAt() { return this._receivedAt; }
  public get receivedAtFromNow() { return this._receivedAt ? moment(this._receivedAt).fromNow() : null; }
  public get canceledAt() { return this._canceledAt; }
  public get canceledAtFromNow() { return this._canceledAt ? moment(this._canceledAt).fromNow() : null; }
  public get completedAt() { return this._completedAt; }
  public get completedAtFromNow() { return this._completedAt ? moment(this._completedAt).fromNow() : null; }
  public get failedAt() { return this._failedAt; }
  public get failedAtFromNow() {
    return this._failedAt && this._failedAt.length > 0 ? moment(this._failedAt[this._failedAt.length - 1]).fromNow() : null;
  }
  public get isDone() {
    return !!this._canceledAt || !!this._completedAt;
  }

  /**
   * Check whether the money is already transfered
   * @returns true if the transaction is canceled or the money is transfered
   */
  public get isMoneyTransfered() {
    if (this.isDone) {
      return true;
    }

    return this._receivedAt && this._rates.toBeTransfered.amount <= 0;
  }
  public get status() { return this._status; }
  public get statusToString() {
    switch (this._status) {
      case 'IS_PROCESSED': return 'Waiting';
      case 'IS_RECEIVED': return 'Processed';
      case 'IS_CANCELED': return 'Canceled';
      case 'IS_FAILED': return 'Failed';
      case 'IS_COMPLETED': return 'Succeeded';
      case 'SENT_BACK': return 'Sent Back';
      default: return null;
    }
  }
  public get rates() { return this._rates; }
  public get userId() { return this._userId; }
  public get recipient() { return this._recipient; }
}

export const TransactionPurposes = [
  { name: 'Biaya Pendidikan' },
  { name: 'Kebutuhan Sehari-hari' },
  { name: 'Online Shopping' },
  { name: 'Donasi' },
  { name: 'Mengirim untuk Anggota Keluarga' },
  { name: 'Membayar Pinjaman' },
  { name: 'Lainnya' }
];
