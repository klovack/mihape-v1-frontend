import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { DialogService } from './services/dialog.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor(private dialogService: DialogService, private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkForValidToken();
  }
}
