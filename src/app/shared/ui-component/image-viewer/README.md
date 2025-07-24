# Image Viewer Component

고급 기능을 제공하는 이미지 뷰어 컴포넌트입니다. 확대/축소, 회전, 전체화면, 다중 이미지 지원 등의 기능을 포함합니다.

## 주요 기능

### 기본 기능
- 📷 다중 이미지 갤러리 지원
- 🔍 마우스 휠 및 버튼으로 확대/축소
- 🔄 이미지 회전 (90도 단위)
- 🖱️ 마우스 드래그로 이미지 이동
- 📱 터치 제스처 지원 (핀치 줌, 드래그)
- ⌨️ 키보드 단축키 지원
- 🖼️ 전체화면 모드
- 📝 이미지 정보 패널

### 네비게이션
- ⬅️➡️ 이전/다음 이미지 버튼
- 🖼️ 썸네일 네비게이션
- 📊 이미지 카운터 (현재/전체)

### 사용자 경험
- 🎨 다크/라이트 테마 자동 지원
- 📱 반응형 디자인
- ♿ 접근성 지원
- 🎯 고대비 모드 지원
- 🏃‍♂️ 애니메이션 감소 모드 지원

## 인터페이스

### ImageViewerImage
```typescript
interface ImageViewerImage {
  src: string;        // 이미지 URL (필수)
  alt?: string;       // 대체 텍스트
  title?: string;     // 이미지 제목
  description?: string; // 이미지 설명
}
```

### ImageViewerConfig
```typescript
interface ImageViewerConfig {
  allowZoom?: boolean;        // 확대/축소 허용 (기본: true)
  allowRotation?: boolean;    // 회전 허용 (기본: true)
  allowFullscreen?: boolean;  // 전체화면 허용 (기본: true)
  showThumbnails?: boolean;   // 썸네일 표시 (기본: true)
  showControls?: boolean;     // 컨트롤 버튼 표시 (기본: true)
  enableKeyboard?: boolean;   // 키보드 단축키 (기본: true)
  maxZoom?: number;          // 최대 확대 배율 (기본: 5)
  minZoom?: number;          // 최소 확대 배율 (기본: 0.1)
  zoomStep?: number;         // 확대/축소 단계 (기본: 0.1)
  backgroundColor?: string;   // 배경색 (기본: 'rgba(0, 0, 0, 0.9)')
}
```

## 사용 방법

### 1. 기본 사용법

```typescript
import { ImageViewerComponent, ImageViewerImage } from './shared/ui-component/image-viewer/image-viewer.component';

@Component({
  imports: [ImageViewerComponent]
})
export class MyComponent {
  isVisible = false;
  currentIndex = 0;
  
  images: ImageViewerImage[] = [
    {
      src: 'path/to/image1.jpg',
      alt: 'Image 1',
      title: 'First Image',
      description: 'Description of the first image'
    },
    {
      src: 'path/to/image2.jpg',
      alt: 'Image 2',
      title: 'Second Image',
      description: 'Description of the second image'
    }
  ];

  openViewer(index: number = 0) {
    this.currentIndex = index;
    this.isVisible = true;
  }

  closeViewer() {
    this.isVisible = false;
  }
}
```

```html
<button (click)="openViewer(0)">이미지 보기</button>

<app-image-viewer
  [images]="images"
  [currentIndex]="currentIndex"
  [isVisible]="isVisible"
  (close)="closeViewer()"
  (indexChange)="currentIndex = $event">
</app-image-viewer>
```

### 2. 커스텀 설정

```typescript
export class MyComponent {
  config: ImageViewerConfig = {
    allowZoom: true,
    allowRotation: false,
    showThumbnails: false,
    maxZoom: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.95)'
  };
}
```

```html
<app-image-viewer
  [images]="images"
  [currentIndex]="currentIndex"
  [isVisible]="isVisible"
  [config]="config"
  (close)="closeViewer()">
</app-image-viewer>
```

### 3. 이벤트 처리

```html
<app-image-viewer
  [images]="images"
  [currentIndex]="currentIndex"
  [isVisible]="isVisible"
  (close)="onClose()"
  (indexChange)="onIndexChange($event)"
  (imageLoad)="onImageLoad($event)"
  (imageError)="onImageError($event)">
</app-image-viewer>
```

```typescript
onClose() {
  this.isVisible = false;
  console.log('이미지 뷰어가 닫혔습니다');
}

onIndexChange(index: number) {
  this.currentIndex = index;
  console.log('현재 이미지 인덱스:', index);
}

onImageLoad(image: ImageViewerImage) {
  console.log('이미지 로드 완료:', image);
}

onImageError(error: string) {
  console.error('이미지 로드 실패:', error);
}
```

## 키보드 단축키

| 키 | 기능 |
|---|---|
| `ESC` | 뷰어 닫기 |
| `←` | 이전 이미지 |
| `→` | 다음 이미지 |
| `+` / `=` | 확대 |
| `-` | 축소 |
| `0` | 원본 크기로 리셋 |
| `R` | 이미지 회전 |
| `F` | 전체화면 토글 |
| `I` | 정보 패널 토글 |

## 마우스/터치 제스처

| 제스처 | 기능 |
|---|---|
| 마우스 휠 | 확대/축소 |
| 드래그 | 이미지 이동 |
| 핀치 (모바일) | 확대/축소 |
| 터치 드래그 (모바일) | 이미지 이동 |

## 스타일 커스터마이징

CSS 변수를 사용하여 스타일을 커스터마이징할 수 있습니다:

```scss
app-image-viewer {
  --viewer-bg-color: rgba(0, 0, 0, 0.95);
  --control-bg-color: rgba(255, 255, 255, 0.2);
  --control-hover-color: rgba(255, 255, 255, 0.3);
  --text-color: white;
  --border-radius: 12px;
}
```

## 접근성

- ARIA 라벨 지원
- 키보드 네비게이션
- 스크린 리더 지원
- 고대비 모드 지원
- 애니메이션 감소 모드 지원

## 브라우저 지원

- Chrome/Edge (최신 2개 버전)
- Firefox (최신 2개 버전)
- Safari (최신 2개 버전)
- 모바일 브라우저 (iOS Safari, Chrome Mobile)

## 성능 최적화

- 이미지 지연 로딩 (lazy loading)
- 가상화된 썸네일 렌더링
- 터치 이벤트 최적화
- 메모리 누수 방지

## 예시

대시보드 컴포넌트에서 완전한 사용 예시를 확인할 수 있습니다:
- `features/dashboard/dashboard.component.ts`
- `features/dashboard/dashboard.component.html`
