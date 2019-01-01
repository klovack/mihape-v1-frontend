import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {

  }

  get backRoute() { return this._authService.isUserLoggedIn ? '/overview' : '/'; }

}
