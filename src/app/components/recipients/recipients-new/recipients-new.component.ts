import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/validation/custom.validators';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { RecipientsService } from 'src/app/services/recipients.service';
import Recipient from 'src/app/model/recipients.model';
import BankAccount from 'src/app/model/bankAccount.model';
import { DialogService } from 'src/app/services/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipients-new',
  templateUrl: './recipients-new.component.html',
  styleUrls: ['./recipients-new.component.scss']
})
export class RecipientsNewComponent implements OnInit {

  faCaret = faCaretDown;
  moreInfoExpanded = false;

  newRecipientForm = new FormGroup({
    nameFormControl: new FormControl('', Validators.required),
    countryFormControl: new FormControl('', Validators.required),
    phoneNumberFormControl: new FormControl('', [
      Validators.required,
      CustomValidator.isPhoneNum()
    ]),
    bankNameFormControl: new FormControl('', Validators.required),
    IBANFormControl: new FormControl('', [
      Validators.required,
      CustomValidator.isIBAN()
    ]),
    moreInfoForm: new FormGroup({
      accountNumberFormControl: new FormControl(''),
      bicFormControl: new FormControl(''),
      emailFormControl: new FormControl(''),
    })
  });
  callPrefix = '';

  constructor(
    private countryService: CountryService,
    private recipientsService: RecipientsService,
    private dialogService: DialogService,
    private router: Router
    ) { }

  ngOnInit() {
    this.countryFormControl.valueChanges.subscribe(
      (value) => {
        this.countryService.supportedCountries.forEach(country => {
          if (country.name === value) {
            this.callPrefix = country.callingCode;
            return;
          }
        });
      },
      (err) => { console.log(err); }
    );
  }

  get nameFormControl() { return this.newRecipientForm.get('nameFormControl'); }
  get countryFormControl() { return this.newRecipientForm.get('countryFormControl'); }
  get phoneNumberFormControl() { return this.newRecipientForm.get('phoneNumberFormControl'); }
  get bankNameFormControl() { return this.newRecipientForm.get('bankNameFormControl'); }
  get IBANFormControl() { return this.newRecipientForm.get('IBANFormControl'); }
  get accountNumberFormControl() { return this.moreInfoForm.get('accountNumberFormControl'); }
  get bicFormControl() { return this.moreInfoForm.get('bicFormControl'); }
  get emailFormControl() { return this.moreInfoForm.get('emailFormControl'); }
  get moreInfoForm(): FormGroup { return this.newRecipientForm.controls.moreInfoForm as FormGroup; }

  onMoreInfo() {
    this.moreInfoExpanded = !this.moreInfoExpanded;
    this.faCaret = !this.moreInfoExpanded ? faCaretDown : faCaretUp;
  }

  onSubmit() {
    this.dialogService.startLoading();
    const newRecipient = new Recipient(
      '',
      this.nameFormControl.value,
      this.countryFormControl.value,
      new BankAccount(
        this.bankNameFormControl.value,
        this.IBANFormControl.value,
        this.countryFormControl.value,
        this.accountNumberFormControl.value,
        this.bicFormControl.value,
        [
          { name: 'email', value: this.emailFormControl.value }
        ]
      ),
      '',
      this.callPrefix + this.phoneNumberFormControl.value
    );
    this.recipientsService.createNewRecipient(newRecipient)
      .toPromise()
      .then(() => {
        this.dialogService.stopLoading();
        this.router.navigate(['/recipients']);
      })
      .catch((err) => {
        this.dialogService.stopLoading();
        this.dialogService.viewConnectionError();
      });
  }

}
