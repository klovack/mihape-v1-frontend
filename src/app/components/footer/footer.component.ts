import { Component, OnInit } from '@angular/core';
import { faFacebook, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  year: number;

  faFacebook = faFacebook;
  faYoutube = faYoutube;
  faInstagram = faInstagram;
  faMail = faEnvelope;

  constructor() { }

  ngOnInit() {
    this.year = new Date(Date.now()).getFullYear();
  }

}
