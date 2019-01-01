import { Component, DoCheck, Input, OnChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-timeout',
  templateUrl: './timeout.component.html',
  styleUrls: ['./timeout.component.scss']
})
export class TimeoutComponent implements DoCheck {

  @Input() displayColor: string;

  coundownInterval: any;
  loginTokenLifetime: Date;
  timeoutDisplay: string;
  tokenExpiresLimit = (1000 * 60 * 5); // 5 min
  fullTokenLifetime = 30; // in min

  spinnerColor = 'primary';
  spinnerValue: number;

  showUpdateTokenPrompt = false;
  showInfoBar = false;

  isSecond = false;

  constructor(private _authService: AuthService, private _dialogService: DialogService) { }

  ngDoCheck() {
    // check if we already have logintokenlifetime
    if (!!this._authService.expiresTokenIn) {
      // then we check if the logintokenlifetime is uptodate
      if (!!this.loginTokenLifetime) {
        const isTokenUptodate = this.loginTokenLifetime.getTime() === this._authService.expiresTokenIn.getTime();
        // otherwise we update the time and create(update) interval
        if (!isTokenUptodate) {
          this.updateTimer();
          // console.log('update timer because token is not up to date');
        }
      } else {
        // if the logintokenlifetime is undefined clear interval
        this.updateTimer();
      }
    } else {
      // console.log('stop timer because there\'s no token');
      // we stop the timer
      this.stopTimer();
    }
  }

  onToggleInfoBar() {
    this.showInfoBar = !this.showInfoBar;
  }

  onUpdateLoginToken() {
    this._authService.updateLoginToken()
      .then((expiresToken) => {
        this.loginTokenLifetime = expiresToken;
        this.showUpdateTokenPrompt = false;
      })
      .catch(() => {
        this._dialogService.viewConnectionError();
      });
  }

  private updateTimer() {
    this.stopTimer();
    this.loginTokenLifetime = this._authService.expiresTokenIn;
    this.coundownInterval = setInterval(function() {

      // Get todays date and time
      const now = new Date().getTime();

      if (!this.loginTokenLifetime) {
        this.stopTimer();
      } else {
        // Find the distance between now and the count down date
        const distance = this.loginTokenLifetime - now;
        // Time calculations for minutes
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (minutes > 0) {
          this.timeoutDisplay = `${minutes}`;
          this.isSecond = false;
        } else {
          this.timeoutDisplay = `${seconds}`;
          this.isSecond = true;
        }

        this.spinnerValue = minutes / this.fullTokenLifetime * 100;

        if (this.spinnerValue > 50) {
          this.spinnerColor = 'primary';
        } else if (this.spinnerValue <= 50 && this.spinnerValue > 15) {
          this.spinnerColor = 'accent';
        } else if (this.spinnerValue <= 25) {
          this.spinnerColor = 'warn';
          this.showUpdateTokenPrompt = true;

          if (this.spinnerValue <= 5) {
            this.showInfoBar = true;
          }
        }


        // If the count down is finished, logout
        if (distance <= 0) {
          this.stopTimer();
          this._authService.logoutUser();
        }
      }
    }.bind(this), 1000);
  }

  private stopTimer() {
    this.loginTokenLifetime = null;
    clearInterval(this.coundownInterval);
    this.timeoutDisplay = null;
    this.showInfoBar = false;
    this.showUpdateTokenPrompt = false;
  }

}
