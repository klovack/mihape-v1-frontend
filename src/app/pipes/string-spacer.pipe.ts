import { Pipe, PipeTransform } from '@angular/core';

/**
 * Remove all spaces from the value, then arrange it according to number of characters
 * end then all of them will be joined by the spacer
 * @param {string} value Value to be piped
 * @param {number} characters Numbers of characters it's arranged to
 * @param {string} spacer Spacer which joins the string
 * @return {string} arranged string
 *
 * --------------------------------------------
 * Example:
 *
 * originalVal: '123456789abc', characters: 4, spacer: ' '
 *
 * returnVal: '1234 5678 9abc'
 */
@Pipe({
  name: 'stringSpacer'
})
export class StringSpacerPipe implements PipeTransform {

  transform(value: string, characters: number = 4 , spacer: string = ' '): string {
    const resultArray = [];
    const newVal = value.replace(/\s+/g, '');
    let lastIndex = 0;

    for (let i = 0; i < newVal.length; i += 1) {
      if (i % characters === 0 && i !== 0) {
        lastIndex = i;
        resultArray.push(newVal.slice(i - characters, i));
      }

      if (i === (newVal.length - 1)) {
        resultArray.push(newVal.slice(i - (i - lastIndex)));
      }
    }

    return resultArray.length > 0 ? resultArray.join(spacer) : '';
  }

}
