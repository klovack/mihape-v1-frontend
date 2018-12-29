import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import {
  faEye,
  faEyeSlash,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { DialogService } from '../../services/dialog.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm = new FormGroup({
    emailFormControl: new FormControl('', [ Validators.required, Validators.email ]),
    passwordFormControl: new FormControl('', [ Validators.required ])
  });
  faEye = faEyeSlash;
  faTimes = faTimes;
  errorMessage: string;
  isUserInactive = false;

  constructor(private dialogService: DialogService, private authService: AuthService) { }

  ngOnInit() {
  }

  get emailFormControl() { return this.signinForm.get('emailFormControl'); }
  get passwordFormControl() { return this.signinForm.get('passwordFormControl'); }

  onShowPassword(password: HTMLInputElement) {
    if (password.type === 'password') {
      password.type = 'text';
      this.faEye = faEye;
    } else {
      password.type = 'password';
      this.faEye = faEyeSlash;
    }
  }

  onClose() {
    this.dialogService.closeSignin();
  }

  onNoAccount() {
    this.dialogService.viewSignup();
    this.dialogService.closeSignin();
  }

  onConfirm() {
    this.dialogService.closeSignin();
  }

  onForgotPassword() {
    this.dialogService.closeSignin();
  }

  onSubmit() {
    // add loading animation
    this.dialogService.startLoading();

    const email = this.emailFormControl.value;
    const password = this.passwordFormControl.value;

    this.authService.signInUser(email, password)
    .then(() => {
      this.onClose();
      // remove loading animation
      this.dialogService.stopLoading();
      console.log('success');
    })
    .catch(err => {
      // remove loading animation
      this.dialogService.stopLoading();

      if (err) {
        switch (err.status) {
          case 404:
          case 401:
            this.errorMessage = 'Kata sandi atau email salah';
            break;
          case 400:
            this.errorMessage = 'Email belum dikonfirmasi';
            this.isUserInactive = true;
            break;
          case 500:
            this.errorMessage = 'Kesalahan pada server';
            break;
          default: console.log('Default');
        }
      }

      setTimeout(() => {
        this.errorMessage = null;
      }, 10000);
    });
  }
}
