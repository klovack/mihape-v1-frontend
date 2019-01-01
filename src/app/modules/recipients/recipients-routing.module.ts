import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipientsOverviewComponent } from 'src/app/components/recipients/recipients-overview/recipients-overview.component';
import { RecipientsNewComponent } from 'src/app/components/recipients/recipients-new/recipients-new.component';
import { UserOnlyGuard } from 'src/app/services/auth-guard/user-area-only.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: RecipientsOverviewComponent, canActivate: [UserOnlyGuard], canLoad: [UserOnlyGuard] },
  { path: 'new', component: RecipientsNewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipientsRoutingModule { }
