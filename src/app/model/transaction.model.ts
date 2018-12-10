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
  public get deadlineAt() { return this._deadlineAt; }
  public get receivedAt() { return this._receivedAt; }
  public get canceledAt() { return this._canceledAt; }
  public get failedAt() { return this._failedAt; }
  public get status() { return this._status; }
  public get statusToString() {
    switch (this._status) {
      case 'IS_PROCESSED': return 'Processed';
      case 'IS_RECEIVED': return 'Received';
      case 'IS_CANCELED': return 'Canceled';
      case 'IS_FAILED': return 'Failed';
      case 'IS_COMPLETED': return 'Completed';
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
