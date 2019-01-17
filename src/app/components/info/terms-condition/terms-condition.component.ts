import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermsConditionComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  get backRoute() {
    return this.authService.isUserLoggedIn ? '/overview' : '/';
  }
}
