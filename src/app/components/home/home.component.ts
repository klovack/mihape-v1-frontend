import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _title: Title, private _meta: Meta) { }

  ngOnInit() {
    this._title.setTitle("Mihape - Simplify International Transfer, With our faster solution");
    this._meta.updateTag({name: "description", content: "Mihape Global Nusantara merupakan startup yang bergerak dalam bidang pelayanan pengiriman uang dari Indonesia ke luar negeri dan berbasis di Bandung, Indonesia."})
  }

}
