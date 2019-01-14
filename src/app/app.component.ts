import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { DialogService } from './services/dialog.service';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { filter } from 'rxjs/operators';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  dialogService: DialogService;

  constructor(private authService: AuthService, dialogService: DialogService, router: Router) {
    // if (environment.production) {
      const navEndEvents = router.events.pipe(
        filter(event => event instanceof NavigationEnd),
      );

      navEndEvents.subscribe((event: NavigationEnd) => {
        gtag('config', 'UA-131120730-2', {
          'page_path': event.urlAfterRedirects
        });
      });
    // }
    this.dialogService = dialogService;
  }

  ngOnInit() {
    this.authService.checkForValidToken();
  }
}
