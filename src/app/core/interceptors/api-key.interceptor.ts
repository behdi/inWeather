import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { APP_CONFIG } from '../app';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const appConfig = inject(APP_CONFIG);
  const weatherApiConfig = appConfig.WEATHER_API;

  if (!req.url.includes(weatherApiConfig.BASE_URL)) {
    return next(req);
  }

  const hasQueryParams = hasExistingQueryParams(req.url);
  const urlWithKey = `${req.url}${hasQueryParams ? '&' : '?'}appid=${
    weatherApiConfig.API_KEY
  }`;
  const modifiedReq = req.clone({ url: urlWithKey });

  return next(modifiedReq);
};

/**
 * Checks whether url has existing query parameters.
 *
 * This is a really simple check; just checking for existence of
 * question mark. It is the developer's responsibility to manage
 * existing API urls in their application to not run into false
 * positives.
 *
 * @param url - url to check for.
 * @returns boolean indicating whether queryparams already exist on the url.
 */
function hasExistingQueryParams(url: string) {
  return url.includes('?');
}
