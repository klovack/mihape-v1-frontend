import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatMenuModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
})
export class MaterialModule { }
