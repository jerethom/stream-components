import { Routes } from '@angular/router';

export const signupRouting: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./page/index/index-page.component').then(
        ({ IndexPageComponent }) => IndexPageComponent
      ),
  },
];
