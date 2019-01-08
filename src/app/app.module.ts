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
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { OverviewComponent } from './components/overview/overview.component';
import { InternalErrorComponent } from './components/error/internal/internal-error.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { DialogComponent } from './components/dialog/dialog/dialog.component';
import { ConnectionErrorComponent } from './components/error/connection-error/connection-error.component';
import { TransferInfoComponent } from './components/info/transfer-info/transfer-info.component';
import { AlphaTestComponent } from './components/util/alpha-test/alpha-test.component';
import { ThumbnailsComponent } from './components/templates/thumbnails/thumbnails.component';
import { HowWeWorkShortComponent } from './components/how-we-work/how-we-work-short/how-we-work-short.component';
import { WhyUsComponent } from './components/how-we-work/why-us/why-us.component';
import { FaqComponent } from './components/info/faq/faq.component';
import { AboutUsComponent } from './components/how-we-work/about-us/about-us.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { FooterComponent } from './components/footer/footer.component';
import { TimeoutComponent } from './components/util/timeout/timeout.component';
import { SharedModule } from './modules/shared/shared.module';
import { RatesModule } from './modules/rates/rates.module';
import { AuthModule } from './modules/auth/auth.module';

registerLocaleData(localeId);

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    HomeComponent,
    InternalErrorComponent,
    NotFoundComponent,
    DialogComponent,
    ConnectionErrorComponent,
    TransferInfoComponent,
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
    HttpClientModule,
    FontAwesomeModule,
    MaterialModule,
    SharedModule,
    AuthModule,
    RatesModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'id' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
