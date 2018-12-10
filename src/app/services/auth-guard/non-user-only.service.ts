import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class NonUserOnlyGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Protect the logged in user from the home page
   */
  canActivate(): boolean {
    if (this.authService.isUserLoggedIn) {
      if (this.router.url.includes('/transactions/new')) {
        this.router.navigate(['/transactions/new/rates']);
      } else {
        this.router.navigate(['/overview']);
      }
      return false;
    }
    return true;
  }

  canLoad() {
    if (this.authService.isUserLoggedIn) {
      return false;
    }
    return true;
  }
}
