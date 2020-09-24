import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  faMail = faEnvelope;

  constructor(private authService: AuthService, private _title: Title, private _meta: Meta) { }

  ngOnInit() {
    this._title.setTitle("Tentang Kami | Mihape - Simplify International Transfer, With our faster solution");
    this._meta.updateTag({name: "description", content: "Mihape Global Nusantara merupakan startup yang bergerak dalam bidang pelayanan pengiriman uang dari Indonesia ke luar negeri dan berbasis di Bandung, Indonesia."})
  }

  get backRoute() {
    return this.authService.isUserLoggedIn ? '/overview' : '/';
  }
}
