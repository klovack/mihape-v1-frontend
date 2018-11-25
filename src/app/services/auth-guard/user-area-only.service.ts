import { Injectable } from '@angular/core';
import { CanActivate, Router, CanDeactivate, CanLoad } from '@angular/router';
import { AuthService } from '../auth.service';
import { DialogService } from '../dialog.service';

@Injectable({
  providedIn: 'root'
})
export class UserOnlyGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router, private dialogService: DialogService ) { }

  canActivate(): boolean {
    if (!this.authService.isUserLoggedIn) {
      this.router.navigate(['/']);
      this.dialogService.viewSignin();
      return false;
    }
    return true;
  }

  canLoad() {
    if (!this.authService.isUserLoggedIn) {
      return false;
    }

    return true;
  }
}
