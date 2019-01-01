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

  dialogService: DialogService;

  constructor(private authService: AuthService, dialogService: DialogService) {
    this.dialogService = dialogService;
  }

  ngOnInit() {
    this.authService.checkForValidToken();
  }
}
