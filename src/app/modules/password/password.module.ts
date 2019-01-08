import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PasswordRoutingModule } from './password-routing.module';
import { ForgotPasswordComponent } from 'src/app/components/password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'src/app/components/password/reset-password/reset-password.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    PasswordRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    MaterialModule,
  ],
  declarations: [
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  exports: [
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ]
})
export class PasswordModule { }
