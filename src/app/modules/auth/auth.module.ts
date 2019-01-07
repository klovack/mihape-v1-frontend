import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { SigninComponent } from 'src/app/components/signin/signin.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { ConfirmationComponent } from 'src/app/components/email/confirmation/confirmation.component';
import { ReceivedComponent } from 'src/app/components/email/received/received.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from 'src/app/components/password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'src/app/components/password/reset-password/reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    MaterialModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  declarations: [
    SigninComponent,
    SignupComponent,
    ConfirmationComponent,
    ReceivedComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  exports: [
    SigninComponent,
    SignupComponent,
    ConfirmationComponent,
    ReceivedComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LehMocUAAAAAORUK-IJSJqbtzTZC_O2oAr2GcUA' } as RecaptchaSettings
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'id', // use French language
    },
  ]
})
export class AuthModule { }
