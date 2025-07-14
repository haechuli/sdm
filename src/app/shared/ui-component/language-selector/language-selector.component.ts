import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../../../core/services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="language-selector">
      <div class="selected-language" (click)="toggleDropdown()">
        <img [src]="getCurrentLanguageFlag()" [alt]="getCurrentLanguageName()" class="flag-image">
        <span class="language-name">{{ getCurrentLanguageName() }}</span>
        <span class="arrow" [class.open]="isOpen">▼</span>
      </div>
      
      <div class="dropdown" *ngIf="isOpen">
        <div 
          class="language-option"
          *ngFor="let language of languages"
          [class.active]="language.code === currentLanguage"
          (click)="selectLanguage(language.code)"
        >
          <img [src]="language.flag" [alt]="language.name" class="flag-image">
          <span class="name">{{ language.name }}</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {
  languages: Language[] = [];
  currentLanguage: string = 'ko';
  isOpen: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languages = this.languageService.getLanguages();
    this.subscription.add(
      this.languageService.currentLanguage$.subscribe(lang => {
        this.currentLanguage = lang;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(languageCode: string): void {
    this.languageService.setLanguage(languageCode);
    this.isOpen = false;
  }

  getCurrentLanguageFlag(): string {
    return this.languages.find(lang => lang.code === this.currentLanguage)?.flag || 'https://flagcdn.com/w20/kr.png';
  }

  getCurrentLanguageName(): string {
    return this.languages.find(lang => lang.code === this.currentLanguage)?.name || '한국어';
  }

  // 외부 클릭 시 드롭다운 닫기
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-selector')) {
      this.isOpen = false;
    }
  }
}
