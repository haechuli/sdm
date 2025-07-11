//[CommonModule,RouterModule,FontAwesomeModule,RouterLink],
//schemas: [CUSTOM_ELEMENTS_SCHEMA]

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  expanded?: boolean;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule,RouterModule,FontAwesomeModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  menu: MenuItem[] = [
    {
      label: 'Loan',
      icon: '🗂️',
      children: [
        {
          label: 'WriteOff',
          icon: '📋',
          children: [
            { label: 'Ayda', route: '/mergerequest', icon: '👤' },
            { label: 'WriteOff', route: '/dashboard', icon: '🔒' }
          ]
        },
        {
          label: 'Disbursement',
          icon: '🛠️',
          children: [
            { label: 'Limit', route: '/loan/disburse', icon: '📜' }
          ]
        }
      ]
    }
    ,{
      label: 'Deposit',
      icon: '🗂️',
      children: [
        {
          label: 'WriteOff',
          icon: '📋',
          children: [
            { label: 'Ayda', route: '/admin/users', icon: '👤' },
            { label: 'WriteOff', route: '/admin/roles', icon: '🔒' }
          ]
        },
        {
          label: 'Disbursement',
          icon: '🛠️',
          children: [
            { label: 'Limit', route: '/admin/logs', icon: '📜' }
          ]
        }
      ]
    }
    ,{
      label: 'Account',
      icon: '🗂️',
      children: [
        {
          label: 'WriteOff',
          icon: '📋',
          children: [
            { label: 'Ayda', route: '/admin/users', icon: '👤' },
            { label: 'WriteOff', route: '/admin/roles', icon: '🔒' }
          ]
        },
        {
          label: 'Disbursement',
          icon: '🛠️',
          children: [
            { label: 'Limit', route: '/admin/logs', icon: '📜' }
          ]
        }
      ]
    }
    ,{
      label: 'common',
      icon: '🗂️',
      children: [
        {
          label: 'WriteOff',
          icon: '📋',
          children: [
            { label: 'Ayda', route: '/admin/users', icon: '👤' },
            { label: 'WriteOff', route: '/admin/roles', icon: '🔒' }
          ]
        },
        {
          label: 'Disbursement',
          icon: '🛠️',
          children: [
            { label: 'Limit', route: '/admin/logs', icon: '📜' }
          ]
        }
      ]
    }
    ,{
      label: 'Factory',
      icon: '🗂️',
      children: [
        {
          label: 'WriteOff',
          icon: '📋',
          children: [
            { label: 'Ayda', route: '/admin/users', icon: '👤' },
            { label: 'WriteOff', route: '/admin/roles', icon: '🔒' }
          ]
        },
        {
          label: 'Disbursement',
          icon: '🛠️',
          children: [
            { label: 'Limit', route: '/admin/logs', icon: '📜' }
          ]
        }
      ]
    }
    ,{
      label: 'Treasery',
      icon: '🗂️',
      children: [
        {
          label: 'WriteOff',
          icon: '📋',
          children: [
            { label: 'Ayda', route: '/admin/users', icon: '👤' },
            { label: 'WriteOff', route: '/admin/roles', icon: '🔒' }
          ]
        },
        {
          label: 'Disbursement',
          icon: '🛠️',
          children: [
            { label: 'Limit', route: '/admin/logs', icon: '📜' }
          ]
        }
      ]
    }
  ];

  constructor(public router: Router) {}

  toggleTopLevel(clickedItem: MenuItem) {
    for (const item of this.menu) {
      if (item !== clickedItem) {
        item.expanded = false;
      }
    }
    clickedItem.expanded = !clickedItem.expanded;
  }

  toggleChild(item: MenuItem) {
    item.expanded = !item.expanded;
  }

  isActive(route?: string): boolean {
    return route ? this.router.url === route : false;
  }

  toggleSidenav() {
    const sidenav = document.querySelector('.sidenav');
    if (sidenav) {
      sidenav.classList.toggle('collapsed');
    }
  }
}
