import { HttpClient } from '@angular/common/http';
import {
  EnvironmentProviders,
  Injectable,
  importProvidersFrom,
  inject,
  isDevMode,
  makeEnvironmentProviders,
} from '@angular/core';
import {
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  Translation,
  TranslocoConfig,
  TranslocoLoader,
  TranslocoModule,
  translocoConfig,
} from '@ngneat/transloco';

/**
 * Transloco Http Loader service.
 *
 * It will load the required translation json file.
 */
@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  http = inject(HttpClient);

  /**
   * Gets translation file for specified language.
   *
   * @param lang - desired language to get translation file for.
   * @returns translation file in desired language.
   */
  getTranslation(lang: string) {
    return this.http.get<Translation>(`./assets/i18n/${lang}.json`);
  }
}

export const provideTransloco = (
  config: Partial<TranslocoConfig>
): EnvironmentProviders => {
  return makeEnvironmentProviders([
    importProvidersFrom(TranslocoModule),
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: config.availableLangs,
        defaultLang: config.defaultLang,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ]);
};