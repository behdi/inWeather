import { Pipe, PipeTransform } from '@angular/core';
import { WindSpeedUnits } from '@inWeather/core';

/**
 * Converts wind speed units.
 */
@Pipe({
  name: 'windSpeedConvertor',
  standalone: true,
})
export class WindSpeedConvertorPipe implements PipeTransform {
  /**
   * Conversion rate for wind speed.
   */
  private readonly _conversionRate = 2.2369;

  /**
   * Transforms input wind speed to desired unit.
   *
   * @param value - current wind speed value.
   * @param convertTo - unit that the value should be converted to.
   * @param decimalPlaces - number of maximum decimal places the output should have. Defaults to 2.
   * @returns converted input value in desired unit.
   */
  transform(
    value: number,
    convertTo: WindSpeedUnits,
    decimalPlaces = 2
  ): number {
    const convertedValue =
      convertTo === WindSpeedUnits.MILES_PER_HOUR
        ? value * this._conversionRate
        : value / this._conversionRate;

    return Number(parseFloat(convertedValue.toString()).toFixed(decimalPlaces));
  }
}
