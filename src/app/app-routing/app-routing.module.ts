import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions, Router, Scroll } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { NotFoundComponent } from '../components/error/not-found/not-found.component';
import { UserOnlyGuard } from '../services/auth-guard/user-area-only.service';
import { NonUserOnlyGuard } from '../services/auth-guard/non-user-only.service';
import { FaqComponent } from '../components/info/faq/faq.component';
import { PrivacyPolicyComponent } from '../components/privacy-policy/privacy-policy.component';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AboutUsComponent } from '../components/how-we-work/about-us/about-us.component';
import { TermsConditionComponent } from '../components/info/terms-condition/terms-condition.component';
import { ContactComponent } from '../components/info/contact/contact.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, canActivate: [NonUserOnlyGuard], canLoad: [NonUserOnlyGuard] },
  { path: 'home', redirectTo: '/' },
  { path: 'faq', component: FaqComponent },
  { path: 'overview',
    loadChildren: '../modules/transactions/transactions.module#TransactionsModule',
    canLoad: [UserOnlyGuard]
  },
  { path: 'recipients', loadChildren: '../modules/recipients/recipients.module#RecipientsModule', canLoad: [UserOnlyGuard]},
  { path: 'email', loadChildren: '../modules/email/email.module#EmailModule', canLoad: [NonUserOnlyGuard] },
  { path: 'bank-accounts', loadChildren: '../modules/bank/bank.module#BankModule', canLoad: [UserOnlyGuard] },
  { path: 'password', loadChildren: '../modules/password/password.module#PasswordModule' },
  { path: 'terms-condition', component: TermsConditionComponent },
  // { path: 'contact', component: ContactComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'about-us', component: AboutUsComponent },
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
