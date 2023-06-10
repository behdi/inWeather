import { Routes } from '@angular/router';
import { InWeatherAppComponent } from './in-weather-app.component';

export const routes: Routes = [
  {
    path: '',
    component: InWeatherAppComponent,
    children: [
      {
        path: 'search',
        loadComponent: () =>
          import('./weather-search-page/weather-search-page.component').then(
            (c) => c.WeatherSearchPageComponent
          ),
      },
      {
        path: '**',
        redirectTo: '/search',
        pathMatch: 'full',
      },
    ],
  },
];
