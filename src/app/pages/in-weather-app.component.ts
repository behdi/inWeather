import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoModule, translate } from '@ngneat/transloco';
import { MainLayoutComponent, MenuItem } from '../layout';
import { APP_CONFIG } from '../core/app';

/**
 * InWeather Application class component.
 */
@Component({
  selector: 'app-in-weather-app',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainLayoutComponent, TranslocoModule],
  templateUrl: './in-weather-app.component.html',
  styleUrls: ['./in-weather-app.component.less'],
})
export class InWeatherAppComponent {
  private readonly _appConfig = inject(APP_CONFIG);

  /**
   * Url for the logo.
   */
  logoUrl = this._appConfig.PROJECT.LOGO_URL;

  /**
   * Menu items that should be rendered.
   */
  menuItems: MenuItem[] = [
    {
      text: translate('menu.home'),
      routerLink: '/search',
      isDisabled: false,
      isSelected: false,
      isMatchRouter: true,
      isMatchRouterExact: true,
    },
    {
      text: translate('menu.favoriteLocations'),
      routerLink: '/fav',
      isDisabled: true,
      isSelected: false,
      isMatchRouter: true,
      isMatchRouterExact: true,
    },
  ];
}
