import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmationComponent } from 'src/app/components/email/confirmation/confirmation.component';
import { NonUserOnlyGuard } from 'src/app/services/auth-guard/non-user-only.service';
import { ReceivedComponent } from 'src/app/components/email/received/received.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/email/confirm' },
  { path: 'confirm', component: ConfirmationComponent, canActivate: [NonUserOnlyGuard], canLoad: [NonUserOnlyGuard] },
  { path: 'received/:emailToken', component: ReceivedComponent, canActivate: [NonUserOnlyGuard], canLoad: [NonUserOnlyGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { }
