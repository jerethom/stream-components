import { Routes } from '@angular/router';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { IsLoggedOutGuard } from './guards/is-logged-out.guard';

export const appRouting: Routes = [
  // Public routes
  {
    canActivate: [IsLoggedOutGuard],
    loadChildren: () =>
      import('./signin/signin.routing').then(
        ({ signinRouting }) => signinRouting,
      ),
    path: 'signin',
    title: 'Connexion | Stream Components',
  },
  {
    loadComponent: () =>
      import('./common/unavailable/unavailable.component').then(
        ({ UnavailableComponent }) => UnavailableComponent,
      ),
    path: 'unavailable',
    title: 'Service indisponible | Stream Components',
  },
  // Private routes
  {
    canActivate: [IsLoggedInGuard],
    children: [
      {
        path: 'commands',
        loadComponent: () =>
          import('./common/layouts/menu/main-layout.component').then(
            ({ MainLayoutComponent }) => MainLayoutComponent,
          ),
        loadChildren: () =>
          import('./command/command.routing').then(
            ({ commandRouting }) => commandRouting,
          ),
      },
      {
        path: '**',
        redirectTo: 'commands',
      },
    ],
    path: '',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
