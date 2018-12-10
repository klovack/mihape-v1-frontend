import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { ConfirmationComponent } from '../components/email/confirmation/confirmation.component';
import { ReceivedComponent } from '../components/email/received/received.component';
import { OverviewComponent } from '../components/overview/overview.component';
import { TransactionsOverviewComponent } from '../components/transactions/transactions-overview/transactions-overview.component';
import { RecipientsOverviewComponent } from '../components/recipients/recipients-overview/recipients-overview.component';
import { InternalErrorComponent } from '../components/error/internal/internal-error.component';
import { NotFoundComponent } from '../components/error/not-found/not-found.component';
import { RecipientsNewComponent } from '../components/recipients/recipients-new/recipients-new.component';
import { TransactionsNewComponent } from '../components/transactions/transactions-new/transactions-new.component';
import { RatesConverterComponent } from '../components/rates/rates-converter/rates-converter.component';
import {
  TransactionsAddRecipientsComponent
} from '../components/transactions/transactions-add-recipients/transactions-add-recipients.component';
import { UserOnlyGuard } from '../services/auth-guard/user-area-only.service';
import { NonUserOnlyGuard } from '../services/auth-guard/non-user-only.service';
import {
  TransactionsNewDataComponent
} from '../components/transactions/transactions-new/transactions-new-data/transactions-new-data.component';
import {
  TransactionsNewOverviewComponent
} from '../components/transactions/transactions-new/transactions-new-overview/transactions-new-overview.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, canActivate: [NonUserOnlyGuard], canLoad: [NonUserOnlyGuard] },
  { path: 'overview', component: OverviewComponent, canActivate: [UserOnlyGuard], canLoad: [UserOnlyGuard] },
  { path: 'transactions', component: TransactionsOverviewComponent, canActivate: [UserOnlyGuard], canLoad: [UserOnlyGuard] },
  { path: 'transactions/new', component: TransactionsNewComponent, canLoad: [UserOnlyGuard], children: [
    { path: '', redirectTo: 'rates', pathMatch: 'full', canActivate: [UserOnlyGuard]},
    { path: 'rates', component: RatesConverterComponent, canActivate: [UserOnlyGuard] },
    { path: 'data', component: TransactionsNewDataComponent, canActivate: [UserOnlyGuard] },
    { path: 'recipient', component: TransactionsAddRecipientsComponent, canActivate: [UserOnlyGuard] },
    { path: 'overview', component: TransactionsNewOverviewComponent, canActivate: [UserOnlyGuard] },
  ]},
  { path: 'recipients', component: RecipientsOverviewComponent, canActivate: [UserOnlyGuard], canLoad: [UserOnlyGuard] },
  { path: 'recipients/new', component: RecipientsNewComponent },
  { path: 'email-confirm', component: ConfirmationComponent, canActivate: [NonUserOnlyGuard], canLoad: [NonUserOnlyGuard] },
  { path: 'email-received/:emailToken', component: ReceivedComponent, canActivate: [NonUserOnlyGuard], canLoad: [NonUserOnlyGuard] },
  { path: 'error', component: InternalErrorComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
