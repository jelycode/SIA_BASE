import { Routes } from '@angular/router';
import { MainLayoutComponent } from 'ui-shared';
import { authGuard, guestGuard } from './core/auth/auth.guards';
import { LstPolicy } from './features/products_management/lst-policy/lst-policy';
import { DetPolicy } from './features/products_management/det-policy/det-policy';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./pages/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then((m) => m.DashboardComponent),
      },
      { path: 'policies', component: LstPolicy },
      { path: 'policy', component: DetPolicy },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];
