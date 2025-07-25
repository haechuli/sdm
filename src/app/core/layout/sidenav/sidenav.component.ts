//[CommonModule,RouterModule,FontAwesomeModule,RouterLink],
//schemas: [CUSTOM_ELEMENTS_SCHEMA]

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import {
  faMoneyBillWave,
  faPiggyBank,
  faUserCog,
  faTools,
  faIndustry,
  faUniversity,
  faCreditCard,
  faFileAlt,
  faUser,
  faLock,
  faClipboardList,
  faCoins,
  faChartLine,
  faCogs,
  faFileInvoiceDollar
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface MenuItem {
  label: string;
  icon?: IconDefinition;
  route?: string;
  expanded?: boolean;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule,RouterModule,FontAwesomeModule,TranslatePipe],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  // Font Awesome 아이콘들을 컴포넌트 프로퍼티로 정의
  faMoneyBillWave = faMoneyBillWave;
  faPiggyBank = faPiggyBank;
  faUserCog = faUserCog;
  faTools = faTools;
  faIndustry = faIndustry;
  faUniversity = faUniversity;
  faCreditCard = faCreditCard;
  faFileAlt = faFileAlt;
  faUser = faUser;
  faLock = faLock;
  faClipboardList = faClipboardList;
  faCoins = faCoins;
  faChartLine = faChartLine;
  faCogs = faCogs;
  faFileInvoiceDollar = faFileInvoiceDollar;

  menu: MenuItem[] = [
    {
      label: 'loan',
      icon: faMoneyBillWave,
      children: [
        {
          label: 'WriteOff',
          icon: faFileInvoiceDollar,
          children: [
            { label: 'Ayda', route: '/mergerequest', icon: faUser },
            { label: 'WriteOff', route: '/dashboard', icon: faClipboardList }
          ]
        },
        {
          label: 'Disbursement',
          icon: faCoins,
          children: [
            { label: 'Limit', route: '/loan/disburse', icon: faCreditCard }
          ]
        }
      ]
    },
    {
      label: 'Sales',
      icon: faPiggyBank,
      children: [
        {
          label: 'Dealer',
          icon: faFileInvoiceDollar,
          children: [
            { label: 'image-viewer', route: 'loan/image-viewer', icon: faUser },
            { label: 'Dealer Inquiry', route: '/sa01', icon: faLock }
          ]
        },
        {
          label: 'Disbursement',
          icon: faCoins,
          children: [
            { label: 'Limit', route: '/admin/logs', icon: faFileAlt }
          ]
        }
      ]
    },
    {
      label: 'Account',
      icon: faUserCog,
      children: [
        {
          label: 'WriteOff',
          icon: faFileInvoiceDollar,
          children: [
            { label: 'Ayda', route: '/admin/users', icon: faUser },
            { label: 'WriteOff', route: '/admin/roles', icon: faLock }
          ]
        },
        {
          label: 'Disbursement',
          icon: faCoins,
          children: [
            { label: 'Limit', route: '/admin/logs', icon: faFileAlt }
          ]
        }
      ]
    },
    {
      label: 'common',
      icon: faCogs,
      children: [
        {
          label: 'WriteOff',
          icon: faFileInvoiceDollar,
          children: [
            { label: 'Ayda', route: '/admin/users', icon: faUser },
            { label: 'WriteOff', route: '/admin/roles', icon: faLock }
          ]
        },
        {
          label: 'Disbursement',
          icon: faCoins,
          children: [
            { label: 'Limit', route: '/admin/logs', icon: faFileAlt }
          ]
        }
      ]
    },
    {
      label: 'Factory',
      icon: faIndustry,
      children: [
        {
          label: 'WriteOff',
          icon: faFileInvoiceDollar,
          children: [
            { label: 'Ayda', route: '/admin/users', icon: faUser },
            { label: 'WriteOff', route: '/admin/roles', icon: faLock }
          ]
        },
        {
          label: 'Disbursement',
          icon: faCoins,
          children: [
            { label: 'Limit', route: '/admin/logs', icon: faFileAlt }
          ]
        }
      ]
    },
    {
      label: 'Treasery',
      icon: faUniversity,
      children: [
        {
          label: 'WriteOff',
          icon: faFileInvoiceDollar,
          children: [
            { label: 'Ayda', route: '/admin/users', icon: faUser },
            { label: 'WriteOff', route: '/admin/roles', icon: faLock }
          ]
        },
        {
          label: 'Disbursement',
          icon: faCoins,
          children: [
            { label: 'Limit', route: '/admin/logs', icon: faFileAlt }
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
