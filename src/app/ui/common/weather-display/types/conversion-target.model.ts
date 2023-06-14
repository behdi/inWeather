import { TemperatureUnits, WindSpeedUnits } from '@inWeather/core';

export type ConversionTarget = {
  temperature: TemperatureUnits | null;
  windSpeed: WindSpeedUnits | null;
};

export const METRIC_CONVERSION_TARGET: ConversionTarget = {
  temperature: TemperatureUnits.CELSIUS,
  windSpeed: WindSpeedUnits.METERS_PER_SECOND,
};

export const IMPERIAL_CONVERSION_TARGET: ConversionTarget = {
  temperature: TemperatureUnits.FAHRENHEIT,
  windSpeed: WindSpeedUnits.MILES_PER_HOUR,
};
