import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor(private _authService: AuthService, private _meta: Meta, private _title: Title) { }

  ngOnInit() {
    this._title.setTitle("FAQ | Mihape - Simplify International Transfer, With our faster solution");
    this._meta.updateTag({name: "description", content: "Pertanyaan seputar penggunaan aplikasi berbasis web Mihape Transfer."})
  }

  get backRoute() { return this._authService.isUserLoggedIn ? '/overview' : '/'; }

}
