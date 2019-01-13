import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRoutingModule } from './bank-routing.module';
import { TransferInfoComponent } from 'src/app/components/info/transfer-info/transfer-info.component';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    BankRoutingModule,
    SharedModule,
    FontAwesomeModule,
  ],
  declarations: [
    TransferInfoComponent
  ],
  exports: [
    TransferInfoComponent
  ]
})
export class BankModule { }
