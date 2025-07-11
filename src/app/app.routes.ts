import { Routes } from '@angular/router';


export const routes: Routes = [
  { path : '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
   path: 'dashboard',
     loadComponent: () =>
    import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },

  {
   path: 'project',
     loadComponent: () =>
    import('./features/loan/disburse/disburse.component').then(m => m.DisburseComponent),
  },
  {
   path: 'mergerequest',
     loadComponent: () =>
    import('./features/mergerequest/mergerequest.component').then(m => m.MergerequestComponent),
  },
  {
   path: 'approvals',
     loadComponent: () =>
    import('./features/approvals/approvals.component').then(m => m.ApprovalsComponent),
  },
  {
   path: 'settings',
     loadComponent: () =>
    import('./features/settings/settings.component').then(m => m.SettingsComponent),
  },
  {
    path: 'disburse',
      loadComponent: () =>
     import('./features/loan/disburse/disburse.component').then(m => m.DisburseComponent),
   },

];