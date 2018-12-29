import { Component, OnInit } from '@angular/core';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CustomValidator } from 'src/app/validation/custom.validators';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  faEyePassword = faEyeSlash;
  faEyeConfirmPassword = faEyeSlash;
  resetPasswordForm = new FormGroup({
    passwordFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
    ]),
    confirmPasswordFormControl: new FormControl('')
  }, CustomValidator.passwordMatch);
  formSubmitted = false;
  isUserLoggedIn = false;

  constructor(
    private _authService: AuthService,
    private _dialogService: DialogService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    if (!this._authService.isUserLoggedIn) {
      this.isUserLoggedIn = false;
      if (!this._activatedRoute.snapshot.params.token) {
        console.log(this._activatedRoute.snapshot.params.token);
        return this._router.navigate(['/']);
      }
      // Check the token
      this._authService.checkForValidResetPassword(this._activatedRoute.snapshot.params.token)
        .then((isTokenValid) => {
          if (!isTokenValid) {
            return this._router.navigate(['/']);
          }
          // if token is valid then do nothing
        });
    } else {
      this.isUserLoggedIn = true;
    }
  }

  get passwordFormControl() { return this.resetPasswordForm.get('passwordFormControl'); }
  get confirmPasswordFormControl() { return this.resetPasswordForm.get('confirmPasswordFormControl'); }

  onShowPassword(password: HTMLInputElement) {
    if (password.type === 'password') {
      password.type = 'text';
      this.faEyePassword = faEye;
    } else {
      password.type = 'password';
      this.faEyePassword = faEyeSlash;
    }
  }

  onShowConfirmPassword(password: HTMLInputElement) {
    if (password.type === 'password') {
      password.type = 'text';
      this.faEyeConfirmPassword = faEye;
    } else {
      password.type = 'password';
      this.faEyeConfirmPassword = faEyeSlash;
    }
  }

  onSubmit() {
    const token = this.isUserLoggedIn ? this._authService.authToken : this._activatedRoute.snapshot.params.token;
    this._authService.resetPassword(token, this.passwordFormControl.value)
      .then(() => {
        this.formSubmitted = true;
        if (!this.isUserLoggedIn) {
          setTimeout(() => {
            this._router.navigate(['/overview']);
          }, 2000);
        }
      })
      .catch((err) => {
        if (err.status === 404) {
          this._dialogService.viewTokenExpired(); // not tested yet, hopefully it works
        } else {
          this._dialogService.viewConnectionError();
        }
      });
  }

}
