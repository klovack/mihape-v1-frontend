import { Component, OnInit, OnDestroy } from '@angular/core';
import { faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CustomValidator, CustomAsyncValidator } from '../../validation/custom.validators';
import { CountryService } from '../../services/country.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { debounceTime } from 'rxjs/operators';
import { DialogService } from '../../services/dialog.service';
import User from '../../model/user.model';
import Address from '../../model/address.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  faEye = faEyeSlash;
  faTimes = faTimes;
  signupForm = new FormGroup({
    firstNameControlForm: new FormControl('', Validators.required),
    lastNameControlForm: new FormControl('', Validators.required),
    dateOfBirthControlForm: new FormControl('', [
      Validators.required,
      CustomValidator.isOldEnough()
    ]),
    emailControlForm: new FormControl('', [
      Validators.required,
      Validators.email,
    ], [
      CustomAsyncValidator.isEmailAvailable(this.authService)
    ]),
    passwordControlForm: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
    ]),
    countryControlForm: new FormControl('', [
      Validators.required
    ]),
    provinceControlForm: new FormControl('', [
      Validators.required
    ]),
    provinceOtherControlForm: new FormControl('', []),
    cityControlForm: new FormControl('', [
      Validators.required
    ]),
    postcodeControlForm: new FormControl('', [
      Validators.required,
      CustomValidator.isPostcode()
    ]),
    streetControlForm: new FormControl('', [
      Validators.required
    ]),
    houseNumberControlForm: new FormControl('', [
      Validators.required
    ]),
    agreementControlForm: new FormControl('', [
      Validators.requiredTrue
    ]),
    recaptchaControlForm: new FormControl(null, Validators.required)
  });
  subscription = new Subscription();

  constructor(private countryService: CountryService, private authService: AuthService, private dialogService: DialogService) { }

  ngOnInit() {
    this.subscription = this.countryControlForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.countryService.lookForProvince(value);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get firstNameControlForm() { return this.signupForm.get('firstNameControlForm'); }
  get lastNameControlForm() { return this.signupForm.get('lastNameControlForm'); }
  get dateOfBirthControlForm() { return this.signupForm.get('dateOfBirthControlForm'); }
  get emailControlForm() { return this.signupForm.get('emailControlForm'); }
  get passwordControlForm() { return this.signupForm.get('passwordControlForm'); }
  get countryControlForm() { return this.signupForm.get('countryControlForm'); }
  get provinceControlForm() { return this.signupForm.get('provinceControlForm'); }
  get provinceOtherControlForm() { return this.signupForm.get('provinceOtherControlForm'); }
  get cityControlForm() { return this.signupForm.get('cityControlForm'); }
  get postcodeControlForm() { return this.signupForm.get('postcodeControlForm'); }
  get streetControlForm() { return this.signupForm.get('streetControlForm'); }
  get houseNumberControlForm() { return this.signupForm.get('houseNumberControlForm'); }
  get agreementControlForm() { return this.signupForm.get('agreementControlForm'); }
  get recaptchaControlForm() { return this.signupForm.get('recaptchaControlForm'); }

  /** Toggle show password on and off */
  onShowPassword(password: HTMLInputElement) {
    if (password.type === 'password') {
      password.type = 'text';
      this.faEye = faEye;
    } else {
      password.type = 'password';
      this.faEye = faEyeSlash;
    }
  }

  /** If the form is valid, send the request to the server */
  onSubmit() {
    event.preventDefault();
    if (!(this.signupForm.status === 'VALID')) {
      return;
    }

    this.dialogService.startLoading();

    const province = this.provinceControlForm.value.toString() === 'other'
    ? this.provinceOtherControlForm.value : this.provinceControlForm.value;

    const registerUser = new User('',
      this.firstNameControlForm.value,
      this.lastNameControlForm.value,
      new Date(this.dateOfBirthControlForm.value),
      this.emailControlForm.value,
      new Address(
        this.streetControlForm.value,
        this.houseNumberControlForm.value,
        this.cityControlForm.value,
        this.postcodeControlForm.value,
        province,
        this.countryControlForm.value
        ),
      this.passwordControlForm.value
    );

    this.authService.registerUser(registerUser).then(() => {
      this.onClose();
      this.dialogService.stopLoading();
    });
  }

  onClose() {
    this.dialogService.closeSignup();
  }

  onHaveAccount() {
    this.dialogService.viewSignin();
    this.dialogService.closeSignup();
  }
}
