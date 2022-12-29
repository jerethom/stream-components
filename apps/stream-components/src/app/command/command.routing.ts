import { Routes } from '@angular/router';

export const commandRouting: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/dashboard/dashboard-layout.component').then(
        ({ DashboardLayoutComponent }) => DashboardLayoutComponent,
      ),
    children: [
      {
        path: '',
        title: 'Dashboard | Stream Components',
        loadComponent: () =>
          import('./page/dashboard/dashboard-page.component').then(
            ({ DashboardPageComponent }) => DashboardPageComponent,
          ),
      },
    ],
  },
];
