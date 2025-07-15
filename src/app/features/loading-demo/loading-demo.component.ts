import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../../shared/ui-component/loading/loading.component';
import { LoadingService } from '../../shared/ui-component/loading/loading.service';
import { HttpLoadingExampleService } from '../../core/services/http-loading-example.service';

@Component({
  selector: 'app-loading-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  template: `
    <div class="loading-demo-container">
      <h2>로딩 컴포넌트 데모</h2>
      
      <!-- 로컬 로딩 컴포넌트 테스트 -->
      <div class="demo-section">
        <h3>로컬 로딩 컴포넌트</h3>
        <div class="demo-buttons">
          <button (click)="showLocalLoading('spinner')" class="demo-btn">Spinner</button>
          <button (click)="showLocalLoading('dots')" class="demo-btn">Dots</button>
          <button (click)="showLocalLoading('pulse')" class="demo-btn">Pulse</button>
          <button (click)="showLocalLoading('bars')" class="demo-btn">Bars</button>
          <button (click)="hideLocalLoading()" class="demo-btn hide-btn">숨기기</button>
        </div>
        
        <!-- 로컬 로딩 컴포넌트 -->
        <div class="local-loading-demo">
          <app-loading 
            [isVisible]="isLocalLoading"
            [message]="localMessage"
            [type]="localType"
            [size]="'medium'"
            [overlay]="false">
          </app-loading>
          
          <div class="demo-content" *ngIf="!isLocalLoading">
            <p>로컬 로딩 컴포넌트 영역입니다.</p>
            <p>위 버튼을 클릭하여 다양한 로딩 애니메이션을 확인해보세요.</p>
          </div>
        </div>
      </div>
      
      <!-- 전역 로딩 서비스 테스트 -->
      <div class="demo-section">
        <h3>전역 로딩 서비스</h3>
        <div class="demo-buttons">
          <button (click)="showGlobalLoading()" class="demo-btn">전역 로딩 표시</button>
          <button (click)="testHttpLoading()" class="demo-btn">HTTP 로딩 테스트</button>
          <button (click)="testAsyncOperation()" class="demo-btn">비동기 작업 테스트</button>
        </div>
      </div>
      
      <!-- 로딩 설정 -->
      <div class="demo-section">
        <h3>로딩 설정</h3>
        <div class="demo-controls">
          <label>
            크기:
            <select [(ngModel)]="selectedSize" class="demo-select">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>
          
          <label>
            메시지:
            <input [(ngModel)]="customMessage" class="demo-input" placeholder="커스텀 메시지">
          </label>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loading-demo-container {
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .demo-section {
      margin-bottom: 32px;
      padding: 20px;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      background: #f8f9fa;
    }
    
    .demo-section h3 {
      margin-top: 0;
      color: #495057;
    }
    
    .demo-buttons {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    
    .demo-btn {
      padding: 8px 16px;
      border: 1px solid #007bff;
      border-radius: 4px;
      background: #007bff;
      color: white;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 14px;
    }
    
    .demo-btn:hover {
      background: #0056b3;
      border-color: #0056b3;
    }
    
    .demo-btn.hide-btn {
      background: #dc3545;
      border-color: #dc3545;
    }
    
    .demo-btn.hide-btn:hover {
      background: #c82333;
      border-color: #c82333;
    }
    
    .local-loading-demo {
      position: relative;
      height: 200px;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .demo-content {
      text-align: center;
      color: #6c757d;
    }
    
    .demo-controls {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
    
    .demo-controls label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-weight: 500;
      color: #495057;
    }
    
    .demo-select, .demo-input {
      padding: 6px 12px;
      border: 1px solid #ced4da;
      border-radius: 4px;
      font-size: 14px;
    }
    
    .demo-input {
      min-width: 200px;
    }
  `]
})
export class LoadingDemoComponent {
  isLocalLoading = false;
  localMessage = '로딩 중...';
  localType: 'spinner' | 'dots' | 'pulse' | 'bars' = 'spinner';
  selectedSize: 'small' | 'medium' | 'large' = 'medium';
  customMessage = '처리 중입니다...';

  constructor(
    private loadingService: LoadingService,
    private httpLoadingService: HttpLoadingExampleService
  ) {}

  showLocalLoading(type: 'spinner' | 'dots' | 'pulse' | 'bars') {
    this.localType = type;
    this.localMessage = this.customMessage || '로딩 중...';
    this.isLocalLoading = true;
  }

  hideLocalLoading() {
    this.isLocalLoading = false;
  }

  showGlobalLoading() {
    this.loadingService.show(
      this.customMessage || '전역 로딩 테스트 중...',
      this.localType,
      this.selectedSize
    );
    
    // 3초 후 자동으로 숨기기
    setTimeout(() => {
      this.loadingService.hide();
    }, 3000);
  }

  async testHttpLoading() {
    try {
      // 실제 HTTP 호출 대신 Promise로 시뮬레이션
      const mockHttpCall = new Promise(resolve => {
        setTimeout(() => resolve({ data: 'test' }), 2000);
      });
      
      await this.loadingService.withLoading(
        mockHttpCall,
        'HTTP 요청 처리 중...',
        'pulse',
        this.selectedSize
      );
      
      alert('HTTP 요청 완료!');
    } catch (error) {
      alert('HTTP 요청 실패!');
    }
  }

  async testAsyncOperation() {
    this.loadingService.show(
      '복잡한 작업 처리 중...',
      'bars',
      this.selectedSize
    );

    try {
      // 여러 단계의 비동기 작업 시뮬레이션
      await this.delay(1000);
      this.loadingService.show('1단계 완료...', 'dots', this.selectedSize);
      
      await this.delay(1000);
      this.loadingService.show('2단계 완료...', 'pulse', this.selectedSize);
      
      await this.delay(1000);
      this.loadingService.hide();
      
      alert('모든 작업 완료!');
    } catch (error) {
      this.loadingService.hide();
      alert('작업 실패!');
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
