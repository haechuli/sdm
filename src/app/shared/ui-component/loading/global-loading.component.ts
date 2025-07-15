import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadingService, LoadingState } from './loading.service';

@Component({
  selector: 'app-global-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="global-loading-overlay" 
         [class.visible]="loadingState.isLoading"
         *ngIf="loadingState.isLoading">
      
      <div class="global-loading-container" [class]="'size-' + (loadingState.size || 'medium')">
        
        <!-- Spinner Type -->
        <div *ngIf="(loadingState.type || 'spinner') === 'spinner'" class="loading-spinner">
          <div class="spinner"></div>
        </div>
        
        <!-- Dots Type -->
        <div *ngIf="loadingState.type === 'dots'" class="loading-dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        
        <!-- Pulse Type -->
        <div *ngIf="loadingState.type === 'pulse'" class="loading-pulse">
          <div class="pulse-circle"></div>
        </div>
        
        <!-- Bars Type -->
        <div *ngIf="loadingState.type === 'bars'" class="loading-bars">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
        
        <!-- Loading Message -->
        <div class="loading-message" *ngIf="loadingState.message">
          {{ loadingState.message }}
        </div>
      </div>
      
    </div>
  `,
  styleUrls: ['./loading.component.scss']
})
export class GlobalLoadingComponent implements OnInit, OnDestroy {
  loadingState: LoadingState = { isLoading: false };
  private destroy$ = new Subject<void>();

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.loadingState = state;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
