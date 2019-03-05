import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  faMail = faEnvelope;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  get backRoute() {
    return this.authService.isUserLoggedIn ? '/overview' : '/';
  }
}
