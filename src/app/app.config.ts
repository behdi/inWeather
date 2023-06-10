import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import en from '@angular/common/locales/en';
import { NZ_I18N, en_GB } from 'ng-zorro-antd/i18n';
import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
    provideRouter(routes),
    { provide: NZ_I18N, useValue: en_GB },
  ],
};
