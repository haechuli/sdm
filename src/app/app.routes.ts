import { Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ProjectComponent } from '../pages/project/project.component';
import { MergerequestComponent } from '../pages/mergerequest/mergerequest.component';
import { ApprovalsComponent } from '../pages/approvals/approvals.component';
import { SettingsComponent } from '../pages/settings/settings.component';

export const routes: Routes = [
  { path : '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard',component : DashboardComponent },
  { path: 'project',component : ProjectComponent },
  { path: 'mergerequest',component : MergerequestComponent },
  { path: 'approvals',component : ApprovalsComponent},
  { path: 'settings',component : SettingsComponent },

];
