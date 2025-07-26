import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../../../shared/ui-component/button/button.component';
import { LanguageSelectorComponent } from '../../../shared/ui-component/language-selector/language-selector.component';
import { ThemeSelectorComponent } from '../../../shared/ui-component/theme-selector/theme-selector.component';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { AuthService, UserInfo } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LanguageSelectorComponent, ThemeSelectorComponent, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: UserInfo | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authService.currentUser$.subscribe(user => {
        this.currentUser = user;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  run() {
    alert('실행 버튼 클릭!');
  }

  logout() {
    this.authService.logout();
  }
}
