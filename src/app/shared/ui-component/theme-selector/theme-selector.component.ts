import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ThemeService, ThemeType } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent implements OnInit, OnDestroy {
  currentTheme: ThemeType = 'light';
  private subscription = new Subscription();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.themeService.currentTheme$.subscribe(theme => {
        this.currentTheme = theme;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  setTheme(theme: ThemeType): void {
    this.themeService.setTheme(theme);
  }
}
