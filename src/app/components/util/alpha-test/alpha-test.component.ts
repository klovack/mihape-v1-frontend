import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alpha-test',
  templateUrl: './alpha-test.component.html',
  styleUrls: ['./alpha-test.component.scss']
})
export class AlphaTestComponent implements OnInit {

  isShowing = true;

  constructor() { }

  ngOnInit() {
    const alphaPermission: {accept: boolean, expiresIn: number} = JSON.parse(localStorage.getItem('acceptAlpha'));
    if (alphaPermission.accept && alphaPermission.expiresIn >= Date.now()) {
      this.isShowing = false;
    } else {
      this.isShowing = true;
    }
  }

  onAccept() {
    this.isShowing = false;
    const alphaPermission = {
      accept: false,
      expiresIn: new Date().setTime(Date.now() + (1000 * 60 * 60 * 24 * 7)), // One week
    };
    localStorage.setItem('acceptAlpha', JSON.stringify(alphaPermission));
  }

}
