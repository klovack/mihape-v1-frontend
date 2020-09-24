import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MaterialModule } from 'src/app/material.module';
import { EmailRoutingModule } from './email-routing.module';
import { ConfirmationComponent } from 'src/app/components/email/confirmation/confirmation.component';
import { ReceivedComponent } from 'src/app/components/email/received/received.component';

@NgModule({
  imports: [
    CommonModule,
    EmailRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    MaterialModule,
  ],
  declarations: [
    ConfirmationComponent,
    ReceivedComponent,
  ],
  exports: [
    ReceivedComponent,
    ConfirmationComponent,
  ]
})
export class EmailModule { }
