import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsOverviewComponent } from 'src/app/components/transactions/transactions-overview/transactions-overview.component';
import { TransactionsDetailComponent } from 'src/app/components/transactions/transactions-detail/transactions-detail.component';
import { TransactionsNewComponent } from 'src/app/components/transactions/transactions-new/transactions-new.component';
import {
  TransactionsAddRecipientsComponent
} from 'src/app/components/transactions/transactions-add-recipients/transactions-add-recipients.component';
import {
  TransactionsNewOverviewComponent
} from 'src/app/components/transactions/transactions-new/transactions-new-overview/transactions-new-overview.component';
import {
  TransactionsNewDataComponent
} from 'src/app/components/transactions/transactions-new/transactions-new-data/transactions-new-data.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from '../shared/shared.module';
import { RecipientsModule } from '../recipients/recipients.module';
import { RatesModule } from '../rates/rates.module';
import { OverviewComponent } from 'src/app/components/overview/overview.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

@NgModule({
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    MaterialModule,
    RatesModule,
    RecipientsModule,
    SharedModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  declarations: [
    OverviewComponent,
    TransactionsOverviewComponent,
    TransactionsDetailComponent,
    TransactionsNewComponent,
    TransactionsAddRecipientsComponent,
    TransactionsNewDataComponent,
    TransactionsNewOverviewComponent
  ],
  exports: [
    OverviewComponent,
    TransactionsOverviewComponent,
    TransactionsDetailComponent,
    TransactionsNewComponent,
    TransactionsAddRecipientsComponent,
    TransactionsNewDataComponent,
    TransactionsNewOverviewComponent
  ]
})
export class TransactionsModule { }
