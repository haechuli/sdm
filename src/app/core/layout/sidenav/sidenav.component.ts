import { Component,CUSTOM_ELEMENTS_SCHEMA, effect, EventEmitter, inject, OnInit, Output, output, signal } from '@angular/core';
import { navBarData } from './nav-data';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { navdata } from './navdata';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule,RouterModule,FontAwesomeModule,RouterLink,RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SidenavComponent implements OnInit {

  //@Output() onToggleSideNav : EventEmitter<SideNavToggle> = new EventEmitter();
  onToggleSideNav = output<SideNavToggle>({
    alias : 'onToggleSideNav'
  });

  collapsed = signal(true);
  navlist  = signal<navdata[]>(navBarData);
  //router = inject(Router);
  screenWidth =0;


  ngOnInit() {
    console.log('navData', this.navlist()[0].title);
    this.screenWidth = window.innerWidth;
  }

  onToggleSideNavEff = effect(() => {
    this.onToggleSideNav.emit({screenWidth: this.screenWidth, collapsed: this.collapsed()});
  });


  toggleCollapse() {
     this.collapsed.set(!this.collapsed());
  //   console.log('collapsed1=', this.collapsed());

  //   this.onToggleSideNav.emit({screenWidth: this.screenWidth, collapsed: this.collapsed()});
  }

  closeSidenav() {
     this.collapsed.set(false);
  //   this.onToggleSideNav.emit({screenWidth: this.screenWidth, collapsed: this.collapsed()});
  }
}
