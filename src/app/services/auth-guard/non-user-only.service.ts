import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class NonUserOnlyGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isUserLoggedIn) {
      console.log(this.router.url);
      if (this.router.url.includes('/transactions/new')) {
        console.log('navigate to transactions/new');
        this.router.navigate(['/transactions/new/rates']);
      } else {
        console.log('navigate to transactions/new');
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
