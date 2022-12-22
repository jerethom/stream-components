import { Routes } from '@angular/router';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { IsLoggedOutGuard } from './guards/is-logged-out.guard';

export const appRouting: Routes = [
  // Private routes
  {
    path: '',
    canActivate: [IsLoggedInGuard],
    children: [],
  },
  // Public routes
  {
    path: '',
    canActivate: [IsLoggedOutGuard],
    children: [
      {
        path: 'signin',
        loadChildren: () =>
          import('./signin/signin.routing').then(
            ({ signinRouting }) => signinRouting
          ),
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('./signup/signup.routing').then(
            ({ signupRouting }) => signupRouting
          ),
      },
    ],
  },
  {
    path: 'unavailable',
    loadComponent: () =>
      import('./common/unavailable/unavailable.component').then(
        ({ UnavailableComponent }) => UnavailableComponent
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
