import { Pipe, PipeTransform } from '@angular/core';
import { TemperatureUnits } from '@inWeather/core';

/**
 * Converts temperature units.
 */
@Pipe({
  name: 'tempUnitConvertor',
  standalone: true,
})
export class TempUnitConvertorPipe implements PipeTransform {
  /**
   * Transforms input value to desired unit.
   *
   * @param value - current temp value.
   * @param convertTo - unit to convert to.
   * @param decimalPlaces - number of maximum decimal places the output should have. Defaults to 2.
   * @returns converted temperature with desired decimal points (no trailing zeros).
   */
  transform(
    value: number,
    convertTo: TemperatureUnits,
    decimalPlaces = 2
  ): number {
    const convertedValue =
      convertTo === TemperatureUnits.CELSIUS
        ? this._convertToCelsius(value)
        : this._convertToFahrenheit(value);

    return Number(parseFloat(convertedValue.toString()).toFixed(decimalPlaces));
  }

  /**
   * Converts given value to celsius.
   *
   * @param value - input value
   * @returns input value in celsius
   */
  private _convertToCelsius(value: number) {
    return (value - 32) * (5 / 9);
  }

  /**
   * Converts given value to fahrenheit.
   *
   * @param value - input value
   * @returns input value in fahrenheit
   */
  private _convertToFahrenheit(value: number) {
    return value * (9 / 5) + 32;
  }
}
