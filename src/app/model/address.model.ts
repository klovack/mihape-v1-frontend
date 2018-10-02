export default class Address {
  constructor(
    private _street: string,
    private _houseNumber: string,
    private _city: string,
    private _postcode: string,
    private _province: string,
    private _country: string,
  ) {}

  public get street() { return this._street; }
  public get houseNumber() { return this._houseNumber; }
  public get city() { return this._city; }
  public get postcode() { return this._postcode; }
  public get province() { return this._province; }
  public get country() { return this._country; }

  public toJSON() {
    return {
      street: this.street,
      houseNumber: this.houseNumber,
      city: this.city,
      postcode: this.postcode,
      province: this.province,
      country: this.country
    };
  }
}
