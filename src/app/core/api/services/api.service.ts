import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { APP_CONFIG } from '../../app';
import { GeoData } from '../interfaces';
import { CurrentWeather } from '../interfaces/current-weather.model';
import { GEO_CODING_ENDPOINTS, WEATHER_ENDPOINTS } from '../models';

/**
 * API service
 *
 * Responsible for making all API calls.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _config = inject(APP_CONFIG);
  private readonly _http = inject(HttpClient);

  /**
   * Gets the geo data (lat, lng) for specified city name
   *
   * @param cityName - city name (or part of it) that should be looked up.
   * @param limit - result limit. defaults to 10.
   * @returns geolocation data for specified city.
   */
  getCityGeoData(cityName: string, limit = 10) {
    const url = this.getURL(GEO_CODING_ENDPOINTS.DIRECT, {
      cityName,
      limit: limit.toString(),
      apiKey: this._config.WEATHER_API.API_KEY,
    });

    return this._http.get<GeoData[]>(url);
  }

  /**
   * Get current weather data for specified location.
   *
   * @param lat - Latitude of the desired location.
   * @param lon - Longitude of the desired location.
   * @param units - unit the data should be displayed in.
   * @returns current weather of the specified location
   */
  getCurrentWeather(
    lat: string,
    lon: string,
    units: 'metric' | 'imperial' = 'metric'
  ) {
    const url = this.getURL(WEATHER_ENDPOINTS.CURRENT, {
      lat,
      lon,
      units,
      apiKey: this._config.WEATHER_API.API_KEY,
    });

    return this._http.get<CurrentWeather>(url);
  }

  /**
   * Get Full Endpoint URL.
   *
   * Methods used to concat base url from environment and provided endpoint url.
   *
   * @param endpoint - endpoint path url
   * @param params - endpoint params to replace
   * @returns  full api end-point url
   */
  getURL(endpoint: string, params?: Record<string, string>): string {
    if (params) {
      const endpointWithParams = this._getEndpointWithParams(endpoint, params);
      return `${this._baseUrl}${endpointWithParams}`;
    }

    return `${this._baseUrl}${endpoint}`;
  }

  /**
   * Get endpoint with params.
   *
   * This method replace string params of endpoint with provided in params object.
   * All params going to be looked by `:param` pattern within endpoint string.
   *
   * @param endpoint - backend endpoint
   * @param params - endpoint params
   * @returns endpoint with params
   */
  private _getEndpointWithParams(
    endpoint: string,
    params: Record<string, string>
  ): string {
    return Object.entries(params).reduce(
      (acc, [key, value]) => acc.replace(`:${key}`, value),
      endpoint
    );
  }

  /**
   * Get Base URL.
   *
   * Provide base url from configuration which can be used to make
   * request of the specific endpoint.
   *
   * @returns  base url endpoint
   */
  private get _baseUrl(): string {
    return this._config.WEATHER_API.BASE_URL;
  }
}
