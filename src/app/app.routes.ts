import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/in-weather-app.routes').then((c) => c.routes),
  },
];
