import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermsConditionComponent implements OnInit {

  constructor(private authService: AuthService, private _title: Title, private _meta: Meta) { }

  ngOnInit() {
    this._title.setTitle("Syarat dan Ketentuan | Mihape - Simplify International Transfer, With our faster solution");
    this._meta.updateTag({name: "description", content: "Berikut ini adalah syarat dan ketentuan yang mengatur kewajiban pengguna layanan dan kebijakan transaksi pada Mihape."})
  }

  get backRoute() {
    return this.authService.isUserLoggedIn ? '/overview' : '/';
  }
}
