
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';

import { SidenavComponent } from './core/layout/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodyComponent } from './core/layout/body/body.component';
import { LayoutComponent } from './core/layout/layout/layout.component';
import { AuthService } from './core/auth/auth.service';
import { ThemeService } from './core/services/theme.service';
import { GlobalLoadingComponent } from './shared/ui-component/loading/global-loading.component';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LayoutComponent, GlobalLoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'sdm';
  isSideNavCollapsed = false;
  screenWidth = 0;
  isLoginPage = false;
  isAuthenticated = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    // 테마 서비스 초기화
    this.themeService.getCurrentTheme();

    // 현재 라우트 확인
    this.subscription.add(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.isLoginPage = event.url === '/login';
      })
    );

    // 인증 상태 확인
    this.subscription.add(
      this.authService.isAuthenticated$.subscribe(isAuth => {
        this.isAuthenticated = isAuth;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onToggleSideNav(data: SideNavToggle): void {
    console.log('data', data);

     this.screenWidth = data.screenWidth;
     this.isSideNavCollapsed = data.collapsed;
  }
}
