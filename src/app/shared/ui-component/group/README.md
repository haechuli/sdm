# Group Component

폼 요소들을 그룹화하고 제목과 함께 표시하는 재사용 가능한 컨테이너 컴포넌트입니다.

## 주요 기능

- 📋 제목과 부제목 지원
- 🎨 다양한 헤더 배경 스타일 (primary, secondary, light, dark)
- 📦 패딩 옵션 (none, small, medium, large)
- 🔄 접을 수 있는 콘텐츠 (collapsible)
- 🎯 아이콘 지원
- 📱 반응형 디자인
- 🌙 다크 테마 지원
- ♿ 접근성 지원

## 입력 속성 (Input Properties)

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `title` | string | '' | 그룹 제목 |
| `subtitle` | string | '' | 그룹 부제목 |
| `icon` | string | '' | 헤더 아이콘 (Font Awesome 클래스) |
| `collapsible` | boolean | false | 접을 수 있는지 여부 |
| `collapsed` | boolean | false | 초기 접힘 상태 |
| `headerBackground` | 'primary' \| 'secondary' \| 'light' \| 'dark' | 'light' | 헤더 배경색 |
| `padding` | 'none' \| 'small' \| 'medium' \| 'large' | 'medium' | 콘텐츠 패딩 |
| `border` | boolean | true | 테두리 표시 여부 |
| `shadow` | boolean | false | 그림자 효과 |
| `rounded` | boolean | true | 모서리 둥글게 |
| `width` | string | '100%' | 컨테이너 너비 |
| `height` | string | 'auto' | 컨테이너 높이 |
| `minHeight` | string | '' | 최소 높이 |
| `maxHeight` | string | '' | 최대 높이 |

## 사용 방법

### 1. 기본 사용법

```typescript
import { GroupComponent } from './shared/ui-component/group/group.component';

@Component({
  imports: [GroupComponent]
})
export class MyComponent {
  // 컴포넌트 로직
}
```

```html
<app-group title="사용자 정보">
  <app-input label="이름" placeholder="이름을 입력하세요"></app-input>
  <app-input label="이메일" placeholder="이메일을 입력하세요"></app-input>
</app-group>
```

### 2. 아이콘과 부제목 포함

```html
<app-group 
  title="계정 설정"
  subtitle="사용자 계정과 관련된 설정을 관리합니다"
  icon="fas fa-user-cog">
  
  <app-input label="사용자명"></app-input>
  <app-input label="비밀번호" type="password"></app-input>
</app-group>
```

### 3. 접을 수 있는 그룹

```html
<app-group 
  title="고급 설정"
  subtitle="추가적인 설정 옵션들"
  icon="fas fa-cogs"
  [collapsible]="true"
  [collapsed]="true">
  
  <app-input label="API 키"></app-input>
  <app-combobox label="테마" [options]="themeOptions"></app-combobox>
</app-group>
```

### 4. 다양한 스타일 옵션

```html
<!-- Primary 헤더 -->
<app-group 
  title="중요한 정보"
  headerBackground="primary"
  icon="fas fa-exclamation-triangle">
  <p>중요한 내용...</p>
</app-group>

<!-- 그림자와 큰 패딩 -->
<app-group 
  title="카드 스타일"
  [shadow]="true"
  padding="large">
  <p>카드처럼 보이는 그룹입니다.</p>
</app-group>

<!-- 테두리 없음, 작은 패딩 -->
<app-group 
  title="미니멀 스타일"
  [border]="false"
  padding="small">
  <p>간단한 그룹입니다.</p>
</app-group>
```

### 5. 크기 제한

```html
<app-group 
  title="고정 크기 그룹"
  width="400px"
  height="300px"
  maxHeight="500px">
  <p>크기가 제한된 그룹입니다.</p>
</app-group>
```

### 6. 폼 레이아웃에서 사용

```html
<form [formGroup]="userForm">
  <app-group title="개인정보" icon="fas fa-user">
    <div class="form-row">
      <app-input label="성명" formControlName="name"></app-input>
      <app-input label="이메일" formControlName="email"></app-input>
    </div>
    <app-datepicker label="생년월일" formControlName="birthDate"></app-datepicker>
  </app-group>

  <app-group 
    title="주소정보" 
    icon="fas fa-map-marker-alt"
    [collapsible]="true">
    <app-input label="우편번호" formControlName="zipCode"></app-input>
    <app-input label="주소" formControlName="address"></app-input>
    <app-input label="상세주소" formControlName="detailAddress"></app-input>
  </app-group>

  <app-group title="연락처" icon="fas fa-phone">
    <app-input label="휴대폰" formControlName="mobile"></app-input>
    <app-input label="집전화" formControlName="homePhone"></app-input>
  </app-group>
</form>
```

## 스타일 커스터마이징

CSS 변수를 사용하여 스타일을 커스터마이징할 수 있습니다:

```scss
app-group {
  --bg-secondary: #f8f9fa;
  --border-primary: #dee2e6;
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --primary-500: #0d6efd;
  --primary-600: #0b5ed7;
  --secondary-500: #6c757d;
  --secondary-600: #5c636a;
}
```

## 접근성

- 접을 수 있는 그룹의 경우 키보드 접근 가능
- 스크린 리더를 위한 적절한 ARIA 속성 지원
- 고대비 모드 지원
- 애니메이션 감소 모드 지원

## 브라우저 지원

- Chrome/Edge (최신 2개 버전)
- Firefox (최신 2개 버전)
- Safari (최신 2개 버전)
- 모바일 브라우저

## 사용 예시

### SA01 컴포넌트에서의 사용 예시:

```html
<div class="sa01-container">
  <app-group 
    title="검색 조건"
    subtitle="딜러 정보 검색을 위한 조건을 입력하세요"
    icon="fas fa-search"
    headerBackground="primary">
    
    <div class="form-grid">
      <app-input label="딜러코드"></app-input>
      <app-combobox label="지역" [options]="regions"></app-combobox>
      <app-input label="딜러명"></app-input>
      <app-input label="주소"></app-input>
      <app-button label="검색" color="primary"></app-button>
    </div>
  </app-group>

  <app-group 
    title="딜러 목록"
    icon="fas fa-list"
    [collapsible]="true">
    <app-grid [columns]="dealerColumns" [data]="dealerData"></app-grid>
  </app-group>

  <app-group 
    title="딜러 상세정보"
    icon="fas fa-info-circle"
    [collapsible]="true">
    <app-grid [columns]="detailColumns" [data]="detailData"></app-grid>
  </app-group>
</div>
```

이렇게 하면 기존의 개별 섹션들을 더 구조화되고 재사용 가능한 그룹 컴포넌트로 감쌀 수 있습니다.
