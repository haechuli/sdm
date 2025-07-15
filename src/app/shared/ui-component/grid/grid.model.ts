
import { TemplateRef } from '@angular/core';

export interface GridColumn {
  field: string;
  header: string;
  width?: string; // ✅ 예: '120px', '20%', etc.
  visible?: boolean; // ✅ 표시 여부
  sortable?: boolean; // ✅ 정렬 가능 여부
  resizable?: boolean; // ✅ 크기 조정 가능 여부
  cellClass?: string; // ✅ 셀 CSS 클래스
  cellStyle?: { [key: string]: any }; // ✅ 셀 인라인 스타일
  headerClass?: string; // ✅ 헤더 CSS 클래스
  headerStyle?: { [key: string]: any }; // ✅ 헤더 인라인 스타일
  templateRef?: TemplateRef<any>; // ✅ 커스텀 템플릿
  type?: 'text' | 'number' | 'date' | 'boolean' | 'link' | 'status'; // ✅ 데이터 타입
  format?: string; // ✅ 포맷터 (날짜, 숫자 등)
  editable?: boolean; // ✅ 편집 가능 여부
}

export interface GridRow {
  [key: string]: any;
}

// 정렬 방향
export type SortDirection = 'asc' | 'desc' | null;

// 정렬 정보
export interface SortInfo {
  field: string;
  direction: SortDirection;
}

// 그리드 설정
export interface GridConfig {
  striped?: boolean; // 줄무늬 효과
  bordered?: boolean; // 테두리
  hover?: boolean; // 호버 효과
  condensed?: boolean; // 압축 모드
  theme?: 'default' | 'dark' | 'excel'; // 테마
}