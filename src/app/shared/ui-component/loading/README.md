# HTTP 로딩 화면 컴포넌트

HTTP 호출 시 사용할 수 있는 다양한 로딩 화면 컴포넌트와 서비스입니다.

## 구성 요소

### 1. LoadingComponent
- 재사용 가능한 로딩 컴포넌트
- 4가지 애니메이션 타입 지원 (spinner, dots, pulse, bars)
- 3가지 크기 지원 (small, medium, large)
- 오버레이/인라인 모드 지원

### 2. LoadingService
- 전역 로딩 상태 관리 서비스
- HTTP 요청과 함께 로딩 표시 메서드 제공
- Promise 기반 자동 로딩 처리

### 3. GlobalLoadingComponent
- 전역 로딩 화면 컴포넌트
- 모든 화면 위에 오버레이로 표시

### 4. LoadingInterceptor
- HTTP 요청을 자동으로 감지하여 로딩 표시
- 특정 URL이나 헤더를 통한 로딩 제어 가능
- 요청 방법에 따른 자동 메시지 설정

## 사용 방법

### 1. 기본 설정

`app.config.ts`에 로딩 인터셉터가 이미 등록되어 있습니다:

```typescript
import { loadingInterceptor } from './core/interceptor/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptor, loadingInterceptor, errorInterceptor, loggingInterceptor])),
  ]
};
```

`app.component.html`에 전역 로딩 컴포넌트가 포함되어 있습니다:

```html
<app-global-loading></app-global-loading>
```

### 2. 자동 로딩 (권장)

HTTP 인터셉터가 자동으로 로딩을 처리합니다:

```typescript
// 이 요청은 자동으로 로딩이 표시됩니다
this.http.get('/api/users').subscribe(data => {
  console.log(data);
});
```

### 3. 수동 로딩 제어

#### LoadingService 사용:

```typescript
import { LoadingService } from './shared/ui-component/loading/loading.service';

export class MyComponent {
  constructor(private loadingService: LoadingService) {}

  async loadData() {
    // 방법 1: withLoading 메서드 사용
    const data = await this.loadingService.withLoading(
      this.http.get('/api/data').toPromise(),
      '데이터를 불러오는 중...',
      'pulse',
      'medium'
    );

    // 방법 2: 수동 제어
    this.loadingService.show('처리 중...', 'spinner', 'large');
    try {
      const result = await someAsyncOperation();
      this.loadingService.hide();
    } catch (error) {
      this.loadingService.hide();
    }
  }
}
```

### 4. 로컬 로딩 컴포넌트

특정 영역에만 로딩을 표시하려면:

```html
<div class="my-container">
  <app-loading 
    [isVisible]="isLoading"
    [message]="'데이터 로딩 중...'"
    [type]="'dots'"
    [size]="'medium'"
    [overlay]="false">
  </app-loading>
  
  <div *ngIf="!isLoading">
    <!-- 실제 컨텐츠 -->
  </div>
</div>
```

### 5. HTTP 요청 커스터마이징

특정 HTTP 요청에서 로딩 동작을 제어하려면:

```typescript
// 로딩을 표시하지 않음
const headers = new HttpHeaders({ 'X-Skip-Loading': 'true' });
this.http.get('/api/health', { headers });

// 커스텀 메시지와 타입
const customHeaders = new HttpHeaders({
  'X-Loading-Message': '사용자를 삭제하는 중...',
  'X-Loading-Type': 'bars'
});
this.http.delete('/api/users/1', { headers: customHeaders });
```

## 로딩 애니메이션 타입

1. **spinner**: 회전하는 스피너 (기본값)
2. **dots**: 점프하는 점들
3. **pulse**: 맥박처럼 커졌다 작아지는 원
4. **bars**: 위아래로 움직이는 바들

## 로딩 크기

1. **small**: 작은 크기
2. **medium**: 중간 크기 (기본값)
3. **large**: 큰 크기

## 테마 지원

- 라이트 테마와 다크 테마 자동 지원
- `prefers-color-scheme: dark` 미디어 쿼리 사용
- 접근성을 위한 `prefers-reduced-motion` 지원

## 데모

로딩 컴포넌트의 모든 기능을 테스트해볼 수 있는 데모 컴포넌트가 포함되어 있습니다:

```typescript
// LoadingDemoComponent 사용 예시
// /loading-demo 경로에서 확인 가능
```

## 주의사항

1. 로딩 인터셉터는 기본적으로 모든 HTTP 요청에 적용됩니다
2. 폴링이나 헬스체크와 같은 요청에는 `X-Skip-Loading` 헤더를 사용하세요
3. 중첩된 로딩 호출 시 마지막 호출이 우선됩니다
4. 전역 로딩은 z-index 99999로 설정되어 있습니다
