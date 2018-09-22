import { Component, Input, OnInit } from '@angular/core';
import Rates from '../../../model/rates.model';

@Component({
  selector: 'app-rates-description',
  templateUrl: './rates-description.component.html',
  styleUrls: ['./rates-description.component.scss']
})
export class RatesDescriptionComponent implements OnInit {

  @Input() rates: Rates;

  constructor() { }

  ngOnInit() {
  }
}
