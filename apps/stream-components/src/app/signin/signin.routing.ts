import { Routes } from '@angular/router';

export const signinRouting: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./page/index/index-page.component').then(
        ({ IndexPageComponent }) => IndexPageComponent
      ),
  },
];
