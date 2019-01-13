import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private _countryList = [];
  private _provinceList = [];
  private _europeanList = [];
  private _countriesUrl = environment.production ? '/api/v1/countries' : 'http://localhost:3000/api/v1/countries';

  constructor(private http: HttpClient) { }

  get countries() {
    if (this._countryList.length <= 0) {
      this.http.get(this._countriesUrl).toPromise().then((data: {message, data}) => {
        this._countryList = data.data;
        return this._countryList;
      });
    }

    return this._countryList;
  }

  get supportedCountries() {
    if (this._europeanList.length <= 0) {
      this.countries.forEach(country => {
        if (country.supported) {
          this._europeanList.push(country);
        }
      });
    }

    return this._europeanList;
  }

  get provinces() {
    return this._provinceList;
  }

  lookForProvince(code: string) {
    const obj = this.countries.find(country => country.code === code);
    if (obj && obj.filename) {
      this.http.get(this._countriesUrl + '/' + obj.filename).toPromise().then((data: {message, data}) => {
        this._provinceList = data.data;
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
