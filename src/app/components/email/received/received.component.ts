import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.scss']
})
export class ReceivedComponent implements OnInit {

  /**
   * Available Status:
   * 'PENDING', 'CONFIRMED', 'NOT_FOUND', 'ERROR_CLIENT', 'ERROR_SERVER'
   */
  status = 'PENDING';

  constructor(private _authService: AuthService, private _activatedRoute: ActivatedRoute, private _dialogService: DialogService) { }

  ngOnInit() {
    const { emailToken } = this._activatedRoute.snapshot.params;

    if (emailToken) {
      this._authService.verifyEmailToken(emailToken).subscribe(
        () => {
          this.status = 'CONFIRMED';
        },
        (err) => {
          switch (err.status) {
            case 404:
              this.status = 'NOT_FOUND';
              break;
            case 500:
              this.status = 'ERROR_SERVER';
              break;
            default:
              this.status = 'ERROR_CLIENT';
          }
        }
      );
    } else {
      this.status = 'ERROR_CLIENT';
    }
  }

  onSignin() {
    this._dialogService.viewSignin();
  }

  onSignup() {
    this._dialogService.viewSignup();
  }

}
