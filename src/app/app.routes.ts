import { Routes } from '@angular/router';
import { LstPolicy } from './pages/policy/lst-policy/lst-policy';
import { DetPolicy } from './pages/policy/det-policy/det-policy';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: 'policies', // La URL será: localhost:4200/policies
    component: LstPolicy
  },
  {
    path: 'policy', // La URL será: localhost:4200/policies
    component: DetPolicy
  }
];