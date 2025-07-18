import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeType = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = new BehaviorSubject<ThemeType>('light');
  public currentTheme$ = this.currentTheme.asObservable();

  constructor() {
    // 로컬 스토리지에서 저장된 테마 불러오기
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      // 시스템 테마 감지
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }
  }

  setTheme(theme: ThemeType): void {
    this.currentTheme.next(theme);
    localStorage.setItem('theme', theme);

    // HTML 요소에 테마 클래스 적용
    const htmlElement = document.documentElement;
    htmlElement.className = htmlElement.className.replace(/theme-\w+/g, '');
    htmlElement.classList.add(`theme-${theme}`);

    // 데이터 속성으로도 설정 (CSS 변수 사용을 위해)
    htmlElement.setAttribute('data-theme', theme);
  }

  getCurrentTheme(): ThemeType {
    return this.currentTheme.value;
  }

  toggleTheme(): void {
    const newTheme = this.getCurrentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}
