export interface CurrentWeather {
  /**
   * Coordinates of the location (latitude, longitude).
   */
  coord: { lon: number; lat: number };

  /**
   * Current weather's condition codes.
   *
   * It is possible to meet more than one weather condition for a requested location.
   * The first weather condition in API respond is primary.
   */
  weather: WeatherCondition[];

  /**
   * Internal parameter used by OpenWeather.
   */
  base: string;

  /**
   * Main weather (temperature,  humidity, etc.) data.
   */
  main: WeatherData;

  /**
   * Visibility in meters.
   *
   * The maximum value of the visibility is 10km
   */
  visibility: number;

  /**
   * Data about the wind.
   */
  wind: WindData;

  /**
   * Data about the rain.
   */
  rain?: RainData;

  /**
   * Data about the snow,
   */
  snow?: SnowData;

  /**
   * Cloudiness percentage.
   */
  clouds: { all: number };

  /**
   * Time of data calculation, unix, UTC
   */
  dt: number;

  /**
   * Various internal parameters and data about country (name, sunrise, sunset time).
   */
  sys: WeatherSystemData;

  /**
   * Shifts in seconds from UTC.
   */
  timezone: number;

  /**
   * City id.
   */
  id: number;

  /**
   * City name.
   */
  name: string;

  /**
   * Internal parameter used by OpenWeather.
   */
  cod: number;
}

export interface WeatherCondition {
  /**
   * Weather condition id.
   */
  id: number;

  /**
   * Weather condition group.
   */
  main: WeatherConditionGroup;

  /**
   * Weather condition within the group.
   */
  description: string;

  /**
   * Icon id of the current weather.
   *
   * Can be used like so:
   * {@link https://openweathermap.org/img/wn/[iconId]@2x.png}
   */
  icon: string;
}

export type WeatherConditionGroup =
  | 'Thunderstorm'
  | 'Drizzle'
  | 'Rain'
  | 'Snow'
  | 'Mist'
  | 'Smoke'
  | 'Haze'
  | 'Dust'
  | 'Fog'
  | 'Sand'
  | 'Ash'
  | 'Squall'
  | 'Tornado'
  | 'Clear'
  | 'Clouds';

export interface WeatherData {
  /**
   * Temperature
   *
   * Can be in several units. By default it's in Kelvin,
   * can also be returned in celsius or fahrenheit.
   */
  temp: number;

  /**
   * Human perception of the weather.
   */
  feels_like: number;

  /**
   * Minimum temperature at the moment.
   *
   * This is minimal currently observed temperature
   */
  temp_min: number;

  /**
   * Maximum temperature at the moment.
   *
   * This is maximal currently observed temperature.
   */
  temp_max: number;

  /**
   * Atmospheric pressure.
   */
  pressure: number;

  /**
   * Humidity %.
   */
  humidity: number;

  /**
   * Atmospheric pressure on the sea level, hPa.
   */
  sea_level: number;

  /**
   * Atmospheric pressure on the ground level, hPa.
   */
  grnd_level: number;
}

export interface WindData {
  /**
   * Wind speed.
   *
   * Unit:
   *
   *        `Default`: meter/sec,
   *        `Metric`: meter/sec,
   *        `Imperial`: miles/hour.
   */
  speed: number;

  /**
   * Wind direction, degrees.
   */
  deg: number;

  /**
   * Wind gust.
   *
   * Unit:
   *
   *        `Default`: meter/sec,
   *        `Metric`: meter/sec,
   *        `Imperial`: miles/hour.
   */
  gust: number;
}

export interface RainData {
  /**
   * Rain volume for the last 1 hour, mm.
   */
  ['1h']?: number;

  /**
   * Rain volume for the last 3 hours, mm.
   */
  ['3h']?: number;
}

export interface SnowData {
  /**
   * Snow volume for the last 1 hour, mm.
   */
  ['1h']?: number;

  /**
   * Snow volume for the last 3 hours, mm.
   */
  ['3h']?: number;
}

export interface WeatherSystemData {
  /**
   * Internal parameter used by OpenWeather.
   */
  type: number;

  /**
   * Internal parameter used by OpenWeather.
   */
  id: number;

  /**
   * Country code.
   */
  country: string;

  /**
   * Sunrise time, unix, UTC.
   */
  sunrise: number;

  /**
   * Sunset time, unix, UTC
   */
  sunset: number;
}
