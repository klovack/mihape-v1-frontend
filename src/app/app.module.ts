import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { registerLocaleData, ViewportScroller } from '@angular/common';
import localeId from '@angular/common/locales/id';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RatesConverterComponent } from './components/rates/rates-converter/rates-converter.component';
import { RatesDescriptionComponent } from './components/rates/rates-description/rates-description.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ConfirmationComponent } from './components/email/confirmation/confirmation.component';
import { ReceivedComponent } from './components/email/received/received.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { OverviewComponent } from './components/overview/overview.component';
import { TransactionsOverviewComponent } from './components/transactions/transactions-overview/transactions-overview.component';
import { RecipientsOverviewComponent } from './components/recipients/recipients-overview/recipients-overview.component';
import { InternalErrorComponent } from './components/error/internal/internal-error.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { LoadingBounceComponent } from './components/util/loading-bounce/loading-bounce.component';
import { LoadingCircleComponent } from './components/util/loading-circle/loading-circle.component';
import { RecipientsNewComponent } from './components/recipients/recipients-new/recipients-new.component';
import { RecipientsDetailComponent } from './components/recipients/recipients-detail/recipients-detail.component';
import { TransactionsDetailComponent } from './components/transactions/transactions-detail/transactions-detail.component';
import { DialogComponent } from './components/dialog/dialog/dialog.component';
import { ConnectionErrorComponent } from './components/error/connection-error/connection-error.component';
import { TransactionsNewComponent } from './components/transactions/transactions-new/transactions-new.component';
import {
  TransactionsAddRecipientsComponent
} from './components/transactions/transactions-add-recipients/transactions-add-recipients.component';
import { JwtModule } from '@auth0/angular-jwt';
import { RecipientSelectComponent } from './components/recipients/recipient-select/recipient-select.component';
import {
  TransactionsNewDataComponent
} from './components/transactions/transactions-new/transactions-new-data/transactions-new-data.component';
import {
  TransactionsNewOverviewComponent
} from './components/transactions/transactions-new/transactions-new-overview/transactions-new-overview.component';
import { RatesDetailComponent } from './components/rates/rates-detail/rates-detail.component';
import { TransferInfoComponent } from './components/info/transfer-info/transfer-info.component';
import { StringSpacerPipe } from './pipes/string-spacer.pipe';
import { ForgotPasswordComponent } from './components/password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/password/reset-password/reset-password.component';
import { AlphaTestComponent } from './components/util/alpha-test/alpha-test.component';
import { ThumbnailsComponent } from './components/templates/thumbnails/thumbnails.component';
import { HowWeWorkShortComponent } from './components/how-we-work/how-we-work-short/how-we-work-short.component';
import { WhyUsComponent } from './components/how-we-work/why-us/why-us.component';
import { FaqComponent } from './components/info/faq/faq.component';
import { AboutUsComponent } from './components/how-we-work/about-us/about-us.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { FooterComponent } from './components/footer/footer.component';
import { Router, Scroll } from '@angular/router';
import { filter, first, map, switchMap, timeout } from 'rxjs/operators';
import { TimeoutComponent } from './components/util/timeout/timeout.component';

registerLocaleData(localeId);

@NgModule({
  declarations: [
    AppComponent,
    RatesConverterComponent,
    RatesDescriptionComponent,
    SidebarComponent,
    HeaderComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    ConfirmationComponent,
    ReceivedComponent,
    OverviewComponent,
    TransactionsOverviewComponent,
    RecipientsOverviewComponent,
    InternalErrorComponent,
    NotFoundComponent,
    LoadingBounceComponent,
    LoadingCircleComponent,
    RecipientsNewComponent,
    RecipientsDetailComponent,
    TransactionsDetailComponent,
    DialogComponent,
    ConnectionErrorComponent,
    TransactionsNewComponent,
    TransactionsAddRecipientsComponent,
    RecipientSelectComponent,
    TransactionsNewDataComponent,
    TransactionsNewOverviewComponent,
    RatesDetailComponent,
    TransferInfoComponent,
    StringSpacerPipe,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AlphaTestComponent,
    ThumbnailsComponent,
    HowWeWorkShortComponent,
    WhyUsComponent,
    FaqComponent,
    AboutUsComponent,
    PrivacyPolicyComponent,
    FooterComponent,
    TimeoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'id' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
