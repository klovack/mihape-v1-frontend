import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionsOverviewComponent } from 'src/app/components/transactions/transactions-overview/transactions-overview.component';
import { TransactionsNewComponent } from 'src/app/components/transactions/transactions-new/transactions-new.component';
import { UserOnlyGuard } from 'src/app/services/auth-guard/user-area-only.service';
import { RatesConverterComponent } from 'src/app/components/rates/rates-converter/rates-converter.component';
import {
  TransactionsNewDataComponent
} from 'src/app/components/transactions/transactions-new/transactions-new-data/transactions-new-data.component';
import {
  TransactionsAddRecipientsComponent
} from 'src/app/components/transactions/transactions-add-recipients/transactions-add-recipients.component';
import {
  TransactionsNewOverviewComponent
} from 'src/app/components/transactions/transactions-new/transactions-new-overview/transactions-new-overview.component';
import { OverviewComponent } from 'src/app/components/overview/overview.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: OverviewComponent, canActivate: [UserOnlyGuard], canLoad: [UserOnlyGuard] },
  { path: 'transactions', component: TransactionsOverviewComponent, canActivate: [UserOnlyGuard], canLoad: [UserOnlyGuard] },
  { path: 'transactions/new', component: TransactionsNewComponent, canLoad: [UserOnlyGuard], children: [
    { path: '', redirectTo: 'rates', pathMatch: 'full', canActivate: [UserOnlyGuard]},
    { path: 'rates', component: RatesConverterComponent, canActivate: [UserOnlyGuard] },
    { path: 'data', component: TransactionsNewDataComponent, canActivate: [UserOnlyGuard] },
    { path: 'recipient', component: TransactionsAddRecipientsComponent, canActivate: [UserOnlyGuard] },
    { path: 'overview', component: TransactionsNewOverviewComponent, canActivate: [UserOnlyGuard] },
  ]},
  { path: 'transactions/:id', component: TransactionsNewOverviewComponent, canActivate: [UserOnlyGuard], canLoad: [UserOnlyGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
