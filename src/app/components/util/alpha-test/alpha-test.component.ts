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
    const acceptAlpha = localStorage.getItem('acceptAlpha');
    console.log(acceptAlpha);
    if (acceptAlpha) {
      this.isShowing = false;
    } else {
      this.isShowing = true;
    }
  }

  onAccept() {
    this.isShowing = false;
    localStorage.setItem('acceptAlpha', 'true');
  }

}
