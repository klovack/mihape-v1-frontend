import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { RecipientsService } from '../../../services/recipients.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-recipients-overview',
  templateUrl: './recipients-overview.component.html',
  styleUrls: ['./recipients-overview.component.scss']
})
export class RecipientsOverviewComponent implements OnInit, OnDestroy {

  @Input('limit') limit: Number;
  recipients = [];
  faPlus = faPlus;
  faLeft = faArrowLeft;
  private _subscription: Subscription;

  constructor(
    private _recipientsService: RecipientsService,
    private _activatedRoute: ActivatedRoute,
    private _dialogService: DialogService) { }

  ngOnInit() {
    this._updateRecipients();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  // Getting recipients data from the backend
  private _updateRecipients() {
    this._subscription = this._recipientsService.getAllRecipients(this.limit).subscribe(
      (data) => {
        this.recipients = data;
      },
      (err) => {
        this.recipients = [];
      }
    );
  }

  // Deleting recipient from frontend
  deleteRecipient(deleted) {
    this.recipients.splice(this.recipients.indexOf(deleted), 1);
    this._recipientsService.deleteRecipient(deleted)
      .toPromise()
      .then(() => {
        this._updateRecipients();
      })
      .catch((err) => {
        if (err.status === 404) {
          this._dialogService.viewConnectionError();
        }
        if (err.status === 400) {
          // Show error that recipient still in use
          console.log('should display error');
          this._dialogService.viewUndeletableRecipientError();
        }
        this._updateRecipients();
      });
  }

  get canBack() {
    return this._activatedRoute.snapshot.url[0].path === 'recipients';
  }

  get showMore() {
    return this.recipients.length > 0 && this._activatedRoute.snapshot.url[0].path !== 'recipients';
  }

}
