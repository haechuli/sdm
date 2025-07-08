
import { TemplateRef } from '@angular/core';

export interface GridColumn {
  field: string;
  header: string;
  width?: string; // ✅ 예: '120px', '20%', etc.
  visible?: boolean; // ✅ 추가
  cellClass?: string;
  cellStyle?: { [klass: string]: any };
  templateRef?: TemplateRef<any>; // ✅ 추가
}


export interface GridRow {
  [key: string]: any;
}