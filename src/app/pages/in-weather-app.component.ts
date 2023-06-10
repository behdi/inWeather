import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent, MenuItem } from '../layout';

/**
 * InWeather Application class component.
 */
@Component({
  selector: 'app-in-weather-app',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainLayoutComponent],
  templateUrl: './in-weather-app.component.html',
  styleUrls: ['./in-weather-app.component.less'],
})
export class InWeatherAppComponent {
  menuItems: MenuItem[] = [
    {
      text: 'Home',
      routerLink: '/search',
      isDisabled: false,
      isSelected: false,
      isMatchRouter: true,
      isMatchRouterExact: true,
    },
    {
      text: 'Favorite Locations',
      routerLink: '/fav',
      isDisabled: false,
      isSelected: false,
      isMatchRouter: true,
      isMatchRouterExact: true,
    },
  ];
}
