import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import Recipient from '../model/recipients.model';
import BankAccount from '../model/bankAccount.model';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipientsService {

  private _recipientsUrl = environment.production ?
    '/api/v1/recipients' : 'http://localhost:3000/api/v1/recipients';
  private _deletedRecipients: Recipient[] = [];
  private _recipients: Recipient[] = [];
  private _recentlyChosenRecipient: Recipient;

  constructor(private http: HttpClient, private authService: AuthService) { }

  undoDeleteRecipient() {
    // Create new recipient with the deleted.
    const deleted = this._deletedRecipients.pop();
    if (deleted) {
      return this.createNewRecipient(deleted);
    }

    return null;
  }

  getAllRecipients(limit?: Number) {
    let params;

    if (limit) {
      params = {
        limit: limit.toString()
      };
    } else {
      params = null;
    }

    return this.http.get(this._recipientsUrl, {
      params: params,
      headers: new HttpHeaders({
        'Authorization': this.authService.authToken,
      }),
    })
    .pipe(
      map((data: RecipientRespond) => {
        this._recipients = this._populateRecipients(data);
        return this._recipients;
      })
    );
  }

  /**
   * First search in the recipient list array,
   * if not found then search it in the database
   * @param recipientId The id of the recipient
   */
  getRecipient(recipientId: string): Promise<Recipient> | Recipient {
    if (this._recipients || this._recipients.length >= 0) {
      const foundRecipient = this._findRecipientById(this._recipients, recipientId);
      if (foundRecipient) {
        return foundRecipient;
      }
    }
    return this.getAllRecipients().toPromise()
      .then(recipients => {
        return this._findRecipientById(recipients, recipientId);
      })
      .catch(err => {
        // console.log(err);
        return null;
      });
  }

  deleteRecipient(recipient: Recipient) {
    this._deletedRecipients.push(recipient);
    return this.http.delete(`${this._recipientsUrl}/${recipient.id}`, {
      headers: new HttpHeaders({
        'Authorization': this.authService.authToken,
      }),
    });
  }

  createNewRecipient(recipient: Recipient) {
    return this.http.post(this._recipientsUrl, {
      recipient: {
        name: recipient.name,
        country: recipient.country,
        phoneNumber: recipient.phoneNumber,
        bankAccount: {
          name: recipient.bankAccount.name,
          IBAN: recipient.bankAccount.IBAN,
          accountNumber: recipient.bankAccount.accountNumber,
          bic: recipient.bankAccount.bic,
          otherInformation: recipient.bankAccount.otherInformation
        }
      }
    }, {
      headers: new HttpHeaders({
        'Authorization': this.authService.authToken,
      })
    }).pipe(
      map((data: RecipientRespond) => {
        console.log(data);
        return this._newRecipientObject(data.data);
      }),
    );
  }

  get chosenRecipient() { return this._recentlyChosenRecipient; }

  chooseRecipient(chosenRecipient) {
    this._recentlyChosenRecipient = chosenRecipient;
  }

  clearChosenRecipient() {
    this._recentlyChosenRecipient = null;
  }

  private _findRecipientById(recipients: Recipient[], recipientId: string) {
    for (let i = 0; i < recipients.length; i++) {
      const element = recipients[i];
      if (element.id === recipientId) {
        return element;
      }
    }
    return null;
  }

  private _populateRecipients(data: RecipientRespond) {
    const recipients = [];

    // Populate recipients with new Recipients
    for (let i = 0; i < data.data.length; i++) {
      const currentData = data.data[i];
      const newRecipient = this._newRecipientObject(currentData);
      recipients.push(newRecipient);
    }

    return recipients;
  }

  private _newRecipientObject(currentData) {
    const newRecipient = new Recipient(currentData._id, currentData.name, currentData.country,
      new BankAccount(currentData.bankAccount.name, currentData.bankAccount.IBAN,
        currentData.country, currentData.bankAccount.accountNumber, currentData.bankAccount.bic, currentData.bankAccount.otherInformation
      ), currentData.user, currentData.phoneNumber);
    return newRecipient;
  }
}

class RecipientRespond {
  data: [
    {
      bankAccount: {
        IBAN: string,
        name: string,
        accountNumber: string,
        bic: string,
        otherInformation: {
          _id: string,
          name: string,
          value: string
        }[]
      },
      country: string
      name: string,
      user: string,
      _id: string,
      phoneNumber: string
    }
  ];
  message: string;
}
