import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  email = '';
  subscription: Subscription;
  emailSent = false;
  error = {
    isError: false,
    status: 0
  };

  constructor(private activatedRoute: ActivatedRoute, private dialogService: DialogService, private authService: AuthService) { }

  ngOnInit() {
    this.subscription = new Subscription();
    this.subscription.add(this.activatedRoute.queryParams.subscribe(queryParam => {
      if (queryParam) {
        this.email = queryParam.email;
      }
    }));

    if (!this.email) {
      this.subscription.add(this.activatedRoute.params.subscribe(param => {
        if (param) {
          this.email = param.email;
        }
      }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSendForgotPassword() {
    this.error.isError = false;
    this.subscription.add(this.authService.sendForgotPasswordEmail(this.email).subscribe(
      (response) => {
        console.log(response);
        this.emailSent = true;
        setTimeout(() => {
          this.emailSent = false;
        }, 15000);
      },
      err => {
        this.error.isError = true;
        this.error.status = err.status;
      }
    ));
  }

  isEmailEmpty(emailInput: HTMLInputElement) {
    return !emailInput.validity.valid;
  }

  onSignUp() {
    this.dialogService.viewSignup();
  }

  onSignIn() {
    this.dialogService.viewSignin();
  }

}
