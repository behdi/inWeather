import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { NZ_I18N, en_GB } from 'ng-zorro-antd/i18n';
import { routes } from './app.routes';
import { preloadUserLanguage, provideTransloco } from './provide-transloco';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoService } from '@ngneat/transloco';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
    provideRouter(routes),
    { provide: NZ_I18N, useValue: en_GB },
    provideTransloco({ availableLangs: ['en'], defaultLang: 'en' }),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: preloadUserLanguage,
      deps: [TranslocoService],
    },
  ],
};
