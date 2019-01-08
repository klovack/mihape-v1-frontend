import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordComponent } from 'src/app/components/password/reset-password/reset-password.component';
import { UserOnlyGuard } from 'src/app/services/auth-guard/user-area-only.service';
import { NonUserOnlyGuard } from 'src/app/services/auth-guard/non-user-only.service';
import { ForgotPasswordComponent } from 'src/app/components/password/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/password/forgot' },
  { path: 'forgot', component: ForgotPasswordComponent, canActivate: [NonUserOnlyGuard], canLoad: [NonUserOnlyGuard] },
  { path: 'reset', component: ResetPasswordComponent, canActivate: [UserOnlyGuard], canLoad: [UserOnlyGuard] },
  { path: 'reset/:token', component: ResetPasswordComponent, canActivate: [NonUserOnlyGuard], canLoad: [NonUserOnlyGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordRoutingModule { }
