import { Routes } from '@angular/router';

export const appRouting: Routes = [
  {
    path: 'signin',
    loadChildren: () =>
      import('./signin/signin.routing').then(
        ({ signinRouting }) => signinRouting
      ),
  },
];
