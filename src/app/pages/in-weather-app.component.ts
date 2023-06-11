import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoModule, translate } from '@ngneat/transloco';
import { MainLayoutComponent, MenuItem } from '../layout';

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
      isDisabled: false,
      isSelected: false,
      isMatchRouter: true,
      isMatchRouterExact: true,
    },
  ];
}
