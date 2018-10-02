import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-bounce',
  templateUrl: './loading-bounce.component.html',
  styleUrls: ['./loading-bounce.component.scss']
})
export class LoadingBounceComponent implements OnInit {

  @Input('isBouncing')isBouncing: boolean;

  constructor() { }

  ngOnInit() {
  }

}
