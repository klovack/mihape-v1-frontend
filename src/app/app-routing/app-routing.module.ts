import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions, Router, Scroll } from '@angular/router';

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
import { TransferInfoComponent } from '../components/info/transfer-info/transfer-info.component';
import { ForgotPasswordComponent } from '../components/password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../components/password/reset-password/reset-password.component';
import { FaqComponent } from '../components/info/faq/faq.component';
import { PrivacyPolicyComponent } from '../components/privacy-policy/privacy-policy.component';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, canActivate: [NonUserOnlyGuard], canLoad: [NonUserOnlyGuard] },
  { path: 'home', redirectTo: '/' },
  { path: 'faq', component: FaqComponent },
  { path: 'overview', component: OverviewComponent, canActivate: [UserOnlyGuard], canLoad: [UserOnlyGuard] },
  { path: 'transactions', component: TransactionsOverviewComponent, canActivate: [UserOnlyGuard], canLoad: [UserOnlyGuard] },
  { path: 'transactions/new', component: TransactionsNewComponent, canLoad: [UserOnlyGuard], children: [
    { path: '', redirectTo: 'rates', pathMatch: 'full', canActivate: [UserOnlyGuard]},
    { path: 'rates', component: RatesConverterComponent, canActivate: [UserOnlyGuard] },
    { path: 'data', component: TransactionsNewDataComponent, canActivate: [UserOnlyGuard] },
    { path: 'recipient', component: TransactionsAddRecipientsComponent, canActivate: [UserOnlyGuard] },
    { path: 'overview', component: TransactionsNewOverviewComponent, canActivate: [UserOnlyGuard] },
  ]},
  { path: 'transactions/:id', component: TransactionsNewOverviewComponent, canActivate: [UserOnlyGuard], canLoad: [UserOnlyGuard] },
  { path: 'recipients', component: RecipientsOverviewComponent, canActivate: [UserOnlyGuard], canLoad: [UserOnlyGuard] },
  { path: 'recipients/new', component: RecipientsNewComponent },
  { path: 'email-confirm', component: ConfirmationComponent, canActivate: [NonUserOnlyGuard], canLoad: [NonUserOnlyGuard] },
  { path: 'email-received/:emailToken', component: ReceivedComponent, canActivate: [NonUserOnlyGuard], canLoad: [NonUserOnlyGuard] },
  { path: 'bank-accounts', component: TransferInfoComponent, canActivate: [UserOnlyGuard], canLoad: [UserOnlyGuard] },
  { path: 'bank-accounts/:transactionId', component: TransferInfoComponent, canActivate: [UserOnlyGuard], canLoad: [UserOnlyGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [NonUserOnlyGuard], canLoad: [NonUserOnlyGuard] },
  // Reset password when user is logged in
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [UserOnlyGuard], canLoad: [UserOnlyGuard] },
  // Reset password when user forgot their password
  { path: 'reset-password/:token', component: ResetPasswordComponent, canActivate: [NonUserOnlyGuard], canLoad: [NonUserOnlyGuard] },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'error', component: InternalErrorComponent },
  { path: '**', component: NotFoundComponent }
];

const routesOpts: ExtraOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 56],
};

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 56],
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(router: Router, viewportScroller: ViewportScroller) {
    router.events.pipe(
      filter(event => event instanceof Scroll)
    )
    .subscribe((e: Scroll) => {
      const scrollable = document.getElementById('main-content');
      if (e.position) {
        viewportScroller.scrollToPosition(e.position);
        scrollable.scrollTo(e.position[0], e.position[1]);
      } else if (e.anchor) {
        viewportScroller.scrollToAnchor(e.anchor);
      } else {
        viewportScroller.scrollToPosition([0, 0]);
        document.getElementById('main-content').scrollTo(0, 0);
      }
    });
  }

}
