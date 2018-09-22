import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { RatesService } from './services/rates.service';
import { HttpClientModule } from '@angular/common/http';
import { RatesConverterComponent } from './components/rates/rates-converter/rates-converter.component';
import { RatesDescriptionComponent } from './components/rates/rates-description/rates-description.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

registerLocaleData(localeId);

@NgModule({
  declarations: [
    AppComponent,
    RatesConverterComponent,
    RatesDescriptionComponent,
    SidebarComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'id' },
    RatesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
