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

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'transactions', component: TransactionsOverviewComponent },
  { path: 'recipients', component: RecipientsOverviewComponent },
  { path: 'recipients/new', component: RecipientsNewComponent },
  { path: 'email-confirm', component: ConfirmationComponent },
  { path: 'email-received/:emailToken', component: ReceivedComponent },
  { path: 'error', component: InternalErrorComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
