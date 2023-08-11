import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'favorite',
    loadComponent: () =>
      import('./modules/favorite-list/favorite-list.component'),
  },
  {
    path: '',
    loadComponent: () =>
      import('./modules/city-weather/city-weather.component'),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
