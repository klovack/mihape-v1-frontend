import { Component, DoCheck } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck {

  faUser = faUserTie;
  isUserLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngDoCheck() {
    this.checkForUserLoggedIn();
  }

  checkForUserLoggedIn() {
    this.isUserLoggedIn = this.authService.isUserLoggedIn;
  }

  onLogout() {
    this.authService.logoutUser();
  }

  onNavigateHome() {
    this.checkForUserLoggedIn();
    if (this.isUserLoggedIn) {
      this.router.navigate(['/overview']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
