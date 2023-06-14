import { WindSpeedUnits } from '@inWeather/core';
import { WindSpeedConvertorPipe } from './wind-speed-convertor.pipe';

describe('WindSpeedConvertorPipe', () => {
  let pipe: WindSpeedConvertorPipe;

  beforeEach(() => {
    pipe = new WindSpeedConvertorPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it(`should convert input value of meters per second to miles per hour`, () => {
    const valueInMeters = 10;
    const valueInMiles = pipe.transform(
      valueInMeters,
      WindSpeedUnits.MILES_PER_HOUR
    );

    expect(valueInMiles).toBe(22.37);
  });

  it(`should convert input value of miles per hour to meters per second`, () => {
    const valueInMiles = 10;
    const valueInMeters = pipe.transform(
      valueInMiles,
      WindSpeedUnits.METERS_PER_SECOND
    );

    expect(valueInMeters).toBe(4.47);
  });

  it(`should only show 2 decimal places by default`, () => {
    const mockInputValue = 10;
    const milesValue = pipe.transform(
      mockInputValue,
      WindSpeedUnits.MILES_PER_HOUR
    );
    const metersValue = pipe.transform(
      mockInputValue,
      WindSpeedUnits.METERS_PER_SECOND
    );
    expect(milesValue).toBe(22.37);
    expect(metersValue).toBe(4.47);
  });

  it(`should show desired number of decimal places`, () => {
    const mockInputValue = 10;
    const milesValue = pipe.transform(
      mockInputValue,
      WindSpeedUnits.MILES_PER_HOUR,
      4
    );

    expect(milesValue).toBe(22.369);
  });
});
