import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../services/dialog.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, OnDestroy {

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

  onSendConfirmation() {
    this.error.isError = false;
    this.subscription.add(this.authService.sendConfirmationEmail(this.email).subscribe(
      () => {
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
