import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RatesConverterComponent } from 'src/app/components/rates/rates-converter/rates-converter.component';
import { RatesDescriptionComponent } from 'src/app/components/rates/rates-description/rates-description.component';
import { RatesDetailComponent } from 'src/app/components/rates/rates-detail/rates-detail.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FontAwesomeModule,
    SharedModule,
  ],
  declarations: [
    RatesConverterComponent,
    RatesDescriptionComponent,
    RatesDetailComponent,
  ],
  exports: [
    RatesConverterComponent,
    RatesDescriptionComponent,
    RatesDetailComponent
  ]
})
export class RatesModule { }
