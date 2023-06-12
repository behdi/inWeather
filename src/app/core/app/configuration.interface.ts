import { InjectionToken } from '@angular/core';

/**
 * App Environment.
 *
 * Environments contain all possible app configuration flags used
 * during build steps to identify the application and connect it with the backend.
 * These settings may include additional flags such as `prod` to ensure every optimization
 * is applied by angular.
 */
export type Environment = Partial<AppConfig>;

export interface AppConfig {
  /**
   * Project configuration.
   */
  PROJECT: {
    /**
     * Link to project's logo.
     */
    LOGO_URL: string;

    /**
     * Languages that are available for the app.
     */
    AVAILABLE_LANGUAGES: string[];

    /**
     * App's default language.
     */
    DEFAULT_LANG: string;
  };

  /**
   * Weather API related settings.
   */
  WEATHER_API: {
    /**
     * Base URL for the API.
     */
    BASE_URL: string;

    /**
     * Secret for the API.
     *
     * Please note that we should never store sensitive API keys
     * in a git repository.
     */
    API_KEY: string;
  };
}

const DEFAULT_PROJECT_CONFIG: AppConfig['PROJECT'] = {
  LOGO_URL: '/assets/images/inWeather-logo.svg',
  AVAILABLE_LANGUAGES: ['en'],
  DEFAULT_LANG: 'en',
};

const DEFAULT_WEATHER_API_CONFIG: AppConfig['WEATHER_API'] = {
  BASE_URL: 'https://api.openweathermap.org',
  API_KEY: '7b4fa149865448cc62b6357bdd351382',
} as const;

export const DEFAULT_APP_CONFIG: AppConfig = {
  PROJECT: {
    ...DEFAULT_PROJECT_CONFIG,
  },
  WEATHER_API: {
    ...DEFAULT_WEATHER_API_CONFIG,
  },
};

export const APP_CONFIG = new InjectionToken<AppConfig>(
  '[Core] App Config Token'
);
