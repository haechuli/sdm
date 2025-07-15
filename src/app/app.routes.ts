import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then(m => m.LoginComponent),
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },

  {
    path: 'project',
    loadComponent: () =>
      import('./features/loan/disburse/disburse.component').then(m => m.DisburseComponent),
    canActivate: [authGuard]
  },
  
  {
    path: 'mergerequest',
    loadComponent: () =>
      import('./features/mergerequest/mergerequest.component').then(m => m.MergerequestComponent),
    canActivate: [authGuard]
  },
  
  {
    path: 'loading-demo',
    loadComponent: () =>
      import('./features/loading-demo/loading-demo.component').then(m => m.LoadingDemoComponent),
    canActivate: [authGuard]
  },
  
  {
    path: 'settings',
    loadComponent: () =>
      import('./features/settings/settings.component').then(m => m.SettingsComponent),
    canActivate: [authGuard]
  },
  
  {
    path: 'loan/disburse',
    loadComponent: () =>
      import('./features/loan/disburse/disburse.component').then(m => m.DisburseComponent),
    canActivate: [authGuard]
  },

  // 404 페이지나 기타 라우트가 필요한 경우 여기에 추가
  { path: '**', redirectTo: 'login' }
];