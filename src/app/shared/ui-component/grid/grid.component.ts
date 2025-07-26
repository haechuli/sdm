import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
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
export class GridComponent implements AfterViewInit, OnDestroy {
  @Input() columns: GridColumn[] = [];
  @Input() data: GridRow[] = [];
  @Input() enablePagination = false;
  @Input() pageSize = 10;
  @Input() selectable = false; // ✅ 체크박스 사용 여부
  @Input() virtualScroll = false; // ✅ virtual scroll 활성화 여부
  @Input() width: string = '100%';     // ✅ 기본값 지정 가능
  @Input() height: string = '500px';   // ✅ 전체 Grid 높이 (헤더 + 스크롤 영역)
  @Input() loading: boolean = false;   // ✅ 로딩 상태

  @Output() rowClick = new EventEmitter<GridRow>();
  @Output() rowDoubleClick = new EventEmitter<GridRow>(); // ✅ 더블클릭 이벤트
  @Output() selectedRowsChange = new EventEmitter<GridRow[]>(); // ✅ 선택 행 알림

  // ViewChild 참조들
  @ViewChild('headerWrapper', { static: false }) headerWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('viewport', { static: false }) viewport!: ElementRef<HTMLDivElement>;

  selectedSet = new Set<GridRow>();
  currentPage = 1;
  
  // 스크롤 이벤트 리스너들 저장
  private scrollListeners: Array<{ element: HTMLElement, listener: (event: Event) => void }> = [];
  
  // 이전 스크롤 위치 저장 (가로 스크롤만 감지하기 위해)
  private lastScrollLeft = 0;

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

  onRowDoubleClick(row: GridRow) {
    this.rowDoubleClick.emit(row);
  }

  // 뷰포트 스크롤 이벤트 핸들러 - 가로 스크롤만 감지 (최적화)
  onViewportScroll(event: Event) {
    if (this.headerWrapper) {
      const target = event.target as HTMLElement;
      const currentScrollLeft = target.scrollLeft;
      
      // 가로 스크롤 위치가 변경된 경우에만 헤더 동기화
      if (currentScrollLeft !== this.lastScrollLeft) {
        // requestAnimationFrame을 사용하여 성능 최적화
        requestAnimationFrame(() => {
          if (this.headerWrapper) {
            this.headerWrapper.nativeElement.scrollLeft = currentScrollLeft;
          }
        });
        this.lastScrollLeft = currentScrollLeft;
      }
    }
  }

  // 트랙바이 함수들 (성능 최적화)
  trackByRow(index: number, row: GridRow): any {
    return row['id'] || index;
  }

  trackByColumn(index: number, column: GridColumn): string {
    return column.field;
  }

  // 셀 값 가져오기
  getCellValue(row: GridRow, field: string): any {
    return row[field];
  }

  // 셀 클래스 계산
  getCellClass(column: GridColumn, row: GridRow): string {
    let classes = column.cellClass || '';
    
    // 데이터 타입에 따른 클래스 추가
    const value = this.getCellValue(row, column.field);
    if (typeof value === 'number') {
      classes += ' number-cell';
    }
    
    return classes;
  }

  calcViewportHeight(): string {
    // 예: 헤더 높이 40px 만큼 빼기
    const h = parseInt(this.height.replace('px', ''), 10);
    return `${h - 40}px`;
  }

  ngAfterViewInit() {
    // 약간의 지연을 두고 스크롤 동기화 설정
    setTimeout(() => {
      this.setupHorizontalScrollSync();
    }, 100);
    
    // 데이터 변경 시에도 다시 설정
    setTimeout(() => {
      this.setupHorizontalScrollSync();
    }, 500);
  }

  // 가로 스크롤 동기화 설정 - 가로 스크롤만 감지
  private setupHorizontalScrollSync() {
    if (!this.viewport || !this.headerWrapper) {
      return;
    }

    const viewportElement = this.viewport.nativeElement;
    const headerElement = this.headerWrapper.nativeElement;
    
    // 가로 스크롤만 감지하는 최적화된 함수
    const createHorizontalScrollHandler = () => {
      let lastScrollLeft = 0;
      
      return (event: Event) => {
        const target = event.target as HTMLElement;
        const currentScrollLeft = target.scrollLeft;
        
        // 가로 스크롤 위치가 변경된 경우에만 헤더 동기화
        if (currentScrollLeft !== lastScrollLeft) {
          // requestAnimationFrame을 사용하여 성능 최적화
          requestAnimationFrame(() => {
            headerElement.scrollLeft = currentScrollLeft;
          });
          lastScrollLeft = currentScrollLeft;
        }
      };
    };
    
    // 실제 스크롤 요소 찾기
    let scrollElement: HTMLElement;
    
    if (this.virtualScroll) {
      // 가상 스크롤의 경우 cdk-virtual-scroll-viewport 요소 찾기
      const virtualScrollViewport = viewportElement.querySelector('cdk-virtual-scroll-viewport') as HTMLElement;
      if (virtualScrollViewport) {
        scrollElement = virtualScrollViewport;
        
        // virtual scroll viewport의 내부 스크롤 컨테이너도 확인
        const contentWrapper = virtualScrollViewport.querySelector('.cdk-virtual-scroll-content-wrapper') as HTMLElement;
        if (contentWrapper) {
          // content wrapper에도 가로 스크롤 이벤트 추가
          const syncScroll = createHorizontalScrollHandler();
          contentWrapper.addEventListener('scroll', syncScroll);
          this.scrollListeners.push({ element: contentWrapper, listener: syncScroll });
        }
      } else {
        scrollElement = viewportElement;
      }
    } else {
      // 일반 스크롤의 경우 grid-regular-scroll 요소 찾기
      const regularScrollDiv = viewportElement.querySelector('.grid-regular-scroll') as HTMLElement;
      scrollElement = regularScrollDiv || viewportElement;
    }

    // 가로 스크롤 이벤트 리스너 생성
    const syncScroll = createHorizontalScrollHandler();

    // 여러 레벨에서 가로 스크롤 이벤트 감지
    scrollElement.addEventListener('scroll', syncScroll);
    viewportElement.addEventListener('scroll', syncScroll);
    
    // 추가: table wrapper에서도 가로 스크롤 이벤트 감지
    const tableWrappers = viewportElement.querySelectorAll('.grid-table-wrapper');
    tableWrappers.forEach((wrapper) => {
      const wrapperElement = wrapper as HTMLElement;
      const wrapperSyncScroll = createHorizontalScrollHandler();
      wrapperElement.addEventListener('scroll', wrapperSyncScroll);
      this.scrollListeners.push({ element: wrapperElement, listener: wrapperSyncScroll });
    });
    
    // 리스너들을 배열에 저장 (나중에 제거하기 위해)
    this.scrollListeners.push(
      { element: scrollElement, listener: syncScroll },
      { element: viewportElement, listener: syncScroll }
    );
  }

  ngOnDestroy() {
    // 모든 스크롤 이벤트 리스너 제거
    this.scrollListeners.forEach(({ element, listener }) => {
      element.removeEventListener('scroll', listener);
    });
    this.scrollListeners = [];
  }
}
