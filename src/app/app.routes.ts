import { Routes } from '@angular/router';
//import { DashboardComponent } from './features/dashboard/dashboard.component';
//import { ProjectComponent } from './features/project/project.component';
import { MergerequestComponent } from './features/mergerequest/mergerequest.component';
import { ApprovalsComponent } from './features/approvals/approvals.component';
import { SettingsComponent } from './features/settings/settings.component';

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
    import('./features/project/project.component').then(m => m.ProjectComponent),
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
 
];