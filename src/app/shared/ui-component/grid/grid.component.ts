import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridColumn, GridRow } from './grid.model';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  standalone: true,
  selector: 'app-grid',
  imports: [CommonModule,ScrollingModule],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  @Input() columns: GridColumn[] = [];
  @Input() data: GridRow[] = [];
  @Input() enablePagination = false;
  @Input() pageSize = 10;
  @Input() selectable = false; // ✅ 체크박스 사용 여부
  @Input() virtualScroll = false; // ✅ virtual scroll 활성화 여부
  @Input() width: string = '100%';     // ✅ 기본값 지정 가능
  @Input() height: string = '500px';   // ✅ 전체 Grid 높이 (헤더 + 스크롤 영역)


  @Output() rowClick = new EventEmitter<GridRow>();
  @Output() selectedRowsChange = new EventEmitter<GridRow[]>(); // ✅ 선택 행 알림

  selectedSet = new Set<GridRow>();
  currentPage = 1;

  get pagedData(): GridRow[] {
    if (!this.enablePagination) return this.data;
    const start = (this.currentPage - 1) * this.pageSize;
    return this.data.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onToggleRowSelection(event: Event, row: GridRow) {
  const checked = (event.target as HTMLInputElement).checked;
  this.toggleRowSelection(row, checked);
}


  toggleRowSelection(row: GridRow, checked: boolean) {
   
    if (checked) {
      this.selectedSet.add(row);
    } else {
      this.selectedSet.delete(row);
    }
    this.selectedRowsChange.emit(Array.from(this.selectedSet));
  }

  isRowSelected(row: GridRow): boolean {
    return this.selectedSet.has(row);
  }

  onToggleSelectAll(event: Event) {
  const checked = (event.target as HTMLInputElement).checked;
  this.toggleSelectAll(checked);
}


  toggleSelectAll(checked: boolean) {
    
    this.pagedData.forEach(row => {
      if (checked) {
        this.selectedSet.add(row);
      } else {
        this.selectedSet.delete(row);
      }
    });
    this.selectedRowsChange.emit(Array.from(this.selectedSet));
  }

  isAllPageSelected(): boolean {
    return this.pagedData.every(row => this.selectedSet.has(row));
  }

  onRowClick(row: GridRow) {
    this.rowClick.emit(row);
  }

  calcViewportHeight(): string {
    // 예: 헤더 높이 40px 만큼 빼기
    const h = parseInt(this.height.replace('px', ''), 10);
    return `${h - 40}px`;
  }
}
