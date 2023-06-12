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
  TranslocoService,
  translocoConfig,
} from '@ngneat/transloco';
import { lastValueFrom } from 'rxjs';
import { APP_CONFIG } from './core';

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

export const provideTransloco = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    importProvidersFrom(TranslocoModule),
    {
      provide: TRANSLOCO_CONFIG,
      useFactory: () => {
        const { PROJECT } = inject(APP_CONFIG);
        return translocoConfig({
          availableLangs: PROJECT.AVAILABLE_LANGUAGES,
          defaultLang: PROJECT.DEFAULT_LANG,
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        });
      },
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ]);
};

/**
 * Preloads user's language.
 *
 * @param transloco - transloco service
 * @returns promise with loaded language json file
 */
export function preloadUserLanguage(transloco: TranslocoService) {
  const { PROJECT } = inject(APP_CONFIG);

  return function () {
    transloco.setActiveLang(PROJECT.DEFAULT_LANG);
    return lastValueFrom(transloco.load(PROJECT.DEFAULT_LANG));
  };
}
