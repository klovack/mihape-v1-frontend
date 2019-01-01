import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  get backUrl() {
    return this._authService.isUserLoggedIn ? '/overview' : '/';
  }
}
