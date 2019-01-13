import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransferInfoComponent } from 'src/app/components/info/transfer-info/transfer-info.component';
import { UserOnlyGuard } from 'src/app/services/auth-guard/user-area-only.service';

const routes: Routes = [
  { path: '', component: TransferInfoComponent, pathMatch: 'full', canActivate: [UserOnlyGuard], canLoad: [UserOnlyGuard] },
  { path: ':transactionId', component: TransferInfoComponent, canActivate: [UserOnlyGuard], canLoad: [UserOnlyGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }
