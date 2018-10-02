import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
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
    LoadingCircleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'id' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
