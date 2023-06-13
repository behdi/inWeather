import { TemperatureUnits } from '@inWeather/core';
import { TempUnitConvertorPipe } from './temp-unit-convertor.pipe';

describe('TempUnitConvertorPipe', () => {
  let pipe: TempUnitConvertorPipe;

  beforeEach(() => {
    pipe = new TempUnitConvertorPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it(`should convert input value in celsius to fahrenheit`, () => {
    const fahrenheit = pipe.transform(35, TemperatureUnits.FAHRENHEIT);
    expect(fahrenheit).toBe(95);
  });

  it(`should convert input value in fahrenheit to celsius`, () => {
    const celsius = pipe.transform(23, TemperatureUnits.CELSIUS);
    expect(celsius).toBe(-5);
  });

  it(`should only show 2 decimal places by default`, () => {
    const fahrenheitValue = pipe.transform(32.56, TemperatureUnits.FAHRENHEIT);
    const celsiusValue = pipe.transform(50.35, TemperatureUnits.CELSIUS);
    expect(fahrenheitValue).toBe(90.61);
    expect(celsiusValue).toBe(10.19);
  });

  it(`should show desired number of decimal places`, () => {
    const fahrenheitValue = pipe.transform(
      32.56,
      TemperatureUnits.FAHRENHEIT,
      4
    );
    const celsiusValue = pipe.transform(50.35, TemperatureUnits.CELSIUS, 4);

    expect(fahrenheitValue).toBe(90.608);
    expect(celsiusValue).toBe(10.1944);
  });
});
