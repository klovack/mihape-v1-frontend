import { Component, OnInit, Input } from '@angular/core';
import Rates from 'src/app/model/rates.model';

@Component({
  selector: 'app-rates-detail',
  templateUrl: './rates-detail.component.html',
  styleUrls: ['./rates-detail.component.scss']
})
export class RatesDetailComponent implements OnInit {

  @Input('rates') rates: Rates;

  constructor() { }

  ngOnInit() {
  }

}
