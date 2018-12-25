import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import Transaction from '../model/transaction.model';
import Rates from '../model/rates.model';
import Currency from '../model/currency.model';
import { RecipientsService } from './recipients.service';
import { Observable } from 'rxjs';
import { RatesService } from './rates.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private _transactionsUrl = 'http://localhost:3000/api/v1/transactions';

  private _newlyCreatedTransaction: Transaction;
  private _authHeaders = new HttpHeaders({
    'Authorization': this.authService.authToken,
  });

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private recipientsService: RecipientsService,
    private ratesService: RatesService,
  ) { }

  public get newlyCreatedTransaction() { return this._newlyCreatedTransaction; }

  getAllTransactions(limit?: Number) {
    const params = {
      newest: 'true',
      limit: null,
    };

    if (limit) {
      params.limit = limit.toString();
    }

    return this.http.get(this._transactionsUrl, {
      params: params,
      headers: new HttpHeaders({
        'Authorization': this.authService.authToken,
      }),
    })
    .pipe(
      // catchError(err => {
      //   // this.authService.logoutUser();
      //   return new Observable();
      // }),
      map(async (data: TransactionRespond) => {
        return await this._populateTransactions(data);
      })
    );
  }

  getTransactionById(id: string) {

    return this.http.get(`${this._transactionsUrl}/${id}`, {
      headers: new HttpHeaders({
        'Authorization': this.authService.authToken,
      }),
    })
    .pipe(
      map(async (data) => {
        const trx = await this._createTransactionObject(data);
        return trx;
      })
    );
  }

  postNewlyCreatedTransaction() {
    console.log(this._newlyCreatedTransaction);
    return this.http.post(this._transactionsUrl, {
      transaction: {
        name: this._newlyCreatedTransaction.name,
        fromCurrency: {
          base: this._newlyCreatedTransaction.rates.fromOriginalCurrency.baseString,
          amount: this._newlyCreatedTransaction.rates.fromOriginalCurrency.amount,
        },
        toCurrency: {
          base: this._newlyCreatedTransaction.rates.toCurrency.baseString
        },
        recipient: this._newlyCreatedTransaction.recipient.id,
        combineWithFee: this._newlyCreatedTransaction.rates.combineWithFee
      }
    }, {
      headers: this._authHeaders
    }).toPromise()
    .then((data: {data: any}) => {
      return data.data;
    })
    .catch((err) => {
      console.error(err);
      if (err.status === 401) {
        this.authService.logoutUser();
      }
      throw new Error(err);
    });
  }

  clearPreparedTransaction() {
    this._newlyCreatedTransaction = null;
  }

  prepareTransaction(purpose: string, paymentDetails?: string) {
    // Get Recipient from recipientsService
    const newRecipient = this.recipientsService.chosenRecipient;
    // Get User from authService
    const user = this.authService.authUser;
    // Get Rates from ratesService
    const rates = this.ratesService.rates;

    const newPurpose = purpose || (this.newlyCreatedTransaction ? this.newlyCreatedTransaction.name : '');
    const newPaymentDetails = paymentDetails || (this._newlyCreatedTransaction ? this.newlyCreatedTransaction.description : '');

    // Create new transaction
    this._newlyCreatedTransaction = new Transaction(
      null, newPurpose, newPaymentDetails, new Date(), new Date(new Date().setTime(new Date().getTime() + 1000 * 60 * 60 * 12)),
      null, null, null, null, '', rates, user.id, newRecipient
    );

    // Return newlyCreatedTransaction
    return this._newlyCreatedTransaction;
  }

  deleteTransaction(transaction: Transaction) {
    return this.http.delete(`${this._transactionsUrl}/${transaction.id}`, {
      headers: new HttpHeaders({
        'Authorization': this.authService.authToken,
      }),
    }).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.authService.logoutUser();
        }
        throw new Error(err);
      }),
    );
  }

  onMoneyIsTransfered(transaction: Transaction) {
    return this.http.put(`${this._transactionsUrl}/${transaction.id}/transfered`, {}, {
      headers: this._authHeaders
    }).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.authService.logoutUser();
        }
        throw new Error(err);
      })
    );
  }

  private async _populateTransactions(data: TransactionRespond): Promise<Transaction[]> {
    const transactions = [];

    // Populate transactions with data
    for (let i = 0; i < data.data.length; i++) {
      const currentData = data.data[i];
      const newTransaction = await this._createTransactionObject(currentData);
      transactions.push(newTransaction);
    }

    return transactions;
  }

  private async _createTransactionObject(currentData): Promise<Transaction> {
    const recipient = await this.recipientsService.getRecipient(currentData.recipient);
    const newTransaction = new Transaction(
      currentData._id,
      currentData.name, currentData.description, currentData.createdAt, currentData.deadlineAt,
      currentData.receivedAt, currentData.canceledAt, currentData.completedAt, currentData.failedAt, currentData.status,
      new Rates(
        new Currency(currentData.fromCurrency.base, currentData.fromCurrency.originalAmount),
        new Currency(currentData.fromCurrency.base, currentData.fromCurrency.combineAmount),
        new Currency(currentData.toCurrency.base, currentData.toCurrency.originalAmount),
        new Currency(currentData.toCurrency.base, currentData.toCurrency.combineAmount),
        new Currency(currentData.fee.base, currentData.fee.amount),
        currentData.combineWithFee,
        new Currency(currentData.toBeTransfered.base, currentData.toBeTransfered.amount),
      ),
      currentData.user,
      recipient
    );

    return newTransaction;
  }
}

class TransactionRespond {
  data: [
    {
      fromCurrency: {
        base: string,
        originalAmount: number
        combineAmount: number
      },
      toCurrency: {
        base: string,
        originalAmount: number
        combineAmount: number
      },
      toBeTransfered: {
        base: string,
        amount: number
      },
      fee: {
        base: string,
        amount: number
      },
      createdAt: Date,
      deadlineAt: Date,
      receivedAt: Date,
      canceledAt: Date,
      completedAt: Date,
      failedAt: [any],
      status: string,
      _id: string,
      name: string,
      recipient: string,
      combineWithFee: boolean,
      user: string,
      description: string,
    }
  ];
  user: string;
  message: string;
}
