
import { TemplateRef } from '@angular/core';

export interface GridColumn {
  field: string;
  header: string;
  width?: string; // ✅ 예: '120px', '20%', etc.
  cellClass?: string;
  cellStyle?: { [klass: string]: any };
  templateRef?: TemplateRef<any>; // ✅ 추가
}


export interface GridRow {
  [key: string]: any;
}