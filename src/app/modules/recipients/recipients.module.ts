import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RecipientsRoutingModule } from './recipients-routing.module';
import { RecipientsOverviewComponent } from 'src/app/components/recipients/recipients-overview/recipients-overview.component';
import { RecipientsNewComponent } from 'src/app/components/recipients/recipients-new/recipients-new.component';
import { RecipientsDetailComponent } from 'src/app/components/recipients/recipients-detail/recipients-detail.component';
import { RecipientSelectComponent } from 'src/app/components/recipients/recipient-select/recipient-select.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    RecipientsRoutingModule,
    MaterialModule,
    SharedModule,
  ],
  declarations: [
    RecipientsOverviewComponent,
    RecipientsNewComponent,
    RecipientsDetailComponent,
    RecipientSelectComponent,
  ],
  exports: [
    RecipientsOverviewComponent,
    RecipientsNewComponent,
    RecipientsDetailComponent,
    RecipientSelectComponent,
  ]
})
export class RecipientsModule { }
