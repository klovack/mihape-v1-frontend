import { AbstractControl, ValidatorFn, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map, debounceTime, take } from 'rxjs/operators';
import { isPostalCode } from 'validator';

export class CustomValidator {

  /** User must be older than 18 years old */
  public static isOldEnough(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (control.value || control.value !== '') {
        const inputDate = new Date(control.value);
        const isOldEnough = (new Date().getFullYear() - inputDate.getFullYear()) >= 18;
        return isOldEnough ? null : {'isOldEnough': {value: inputDate.getFullYear()}};
      }
      return null;
    };
  }

  public static isPostcode(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const isPostcode = isPostalCode(control.value, 'any');
      return isPostcode ? null : { 'isNotPostcode': true };
    };
  }
}

export class CustomAsyncValidator {
  /** Checking whether email is taken */
  public static isEmailAvailable(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return authService.isEmailAvailable(control.value).pipe(
        debounceTime(500),
        take(1),
        map((response: { message, isAvailable }) => {
          console.log(response);
          return response.isAvailable ? null : { 'isNotAvailable': true };
        }),
        catchError(() => of(null)),
      );
    };
  }
}
