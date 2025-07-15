import { Component,ViewChild,TemplateRef, OnInit } from '@angular/core';
import { GridComponent } from '../../shared/ui-component/grid/grid.component'
import { GridColumn, GridRow } from '../../shared/ui-component/grid/grid.model';

@Component({
  selector: 'app-mergerequest',
  standalone: true,
  imports: [GridComponent],
  templateUrl: './mergerequest.component.html',
  styleUrl: './mergerequest.component.scss'
})
export class MergerequestComponent implements OnInit {

  @ViewChild('action', { static: true }) actionTemplate!: TemplateRef<any>;
  //columns: GridColumn[] = [];
  selectedcontents: any[] = []; 

  // 그리드 설정
  gridColumns: GridColumn[] = [
    { field: 'id', header: 'ID', width: '80px', type: 'number' },
    { field: 'name', header: '고객명', width: '150px', type: 'text' },
    { field: 'phone', header: '전화번호', width: '130px', type: 'text' },
    { field: 'email', header: '이메일', width: '200px', type: 'text' },
    { field: 'amount', header: '금액', width: '120px', type: 'number' },
    { field: 'status', header: '상태', width: '100px', type: 'status' },
    { field: 'date', header: '등록일', width: '120px', type: 'date' }
  ];

  // 샘플 Grid 데이터 생성
  gridData1: GridRow[] = [
    { 
      id: 1, 
      name: '김철수', 
      phone: '010-1234-5678', 
      email: 'kim@example.com', 
      amount: 1500000,
      status: 'active',
      date: '2024-01-15'
    },
    { 
      id: 2, 
      name: '이영희', 
      phone: '010-2345-6789', 
      email: 'lee@example.com', 
      amount: 2300000,
      status: 'inactive',
      date: '2024-01-20'
    },
    { 
      id: 3, 
      name: '박민수', 
      phone: '010-3456-7890', 
      email: 'park@example.com', 
      amount: 850000,
      status: 'pending',
      date: '2024-02-01'
    },
    { 
      id: 4, 
      name: '정수진', 
      phone: '010-4567-8901', 
      email: 'jung@example.com', 
      amount: 3200000,
      status: 'active',
      date: '2024-02-10'
    },
    { 
      id: 5, 
      name: '최동훈', 
      phone: '010-5678-9012', 
      email: 'choi@example.com', 
      amount: 1200000,
      status: 'inactive',
      date: '2024-02-15'
    },
     { 
      id: 6, 
      name: '김철수', 
      phone: '010-1234-5678', 
      email: 'kim@example.com', 
      amount: 1500000,
      status: 'active',
      date: '2024-01-15'
    },
    { 
      id: 7, 
      name: '이영희', 
      phone: '010-2345-6789', 
      email: 'lee@example.com', 
      amount: 2300000,
      status: 'inactive',
      date: '2024-01-20'
    },
    { 
      id: 8, 
      name: '박민수', 
      phone: '010-3456-7890', 
      email: 'park@example.com', 
      amount: 850000,
      status: 'pending',
      date: '2024-02-01'
    },
    { 
      id: 9, 
      name: '정수진', 
      phone: '010-4567-8901', 
      email: 'jung@example.com', 
      amount: 3200000,
      status: 'active',
      date: '2024-02-10'
    },
    { 
      id: 10, 
      name: '최동훈', 
      phone: '010-5678-9012', 
      email: 'choi@example.com', 
      amount: 1200000,
      status: 'inactive',
      date: '2024-02-15'
    },
    { 
      id: 11, 
      name: '박민수', 
      phone: '010-3456-7890', 
      email: 'park@example.com', 
      amount: 850000,
      status: 'pending',
      date: '2024-02-01'
    },
    { 
      id: 12, 
      name: '정수진', 
      phone: '010-4567-8901', 
      email: 'jung@example.com', 
      amount: 3200000,
      status: 'active',
      date: '2024-02-10'
    },
    { 
      id: 13, 
      name: '최동훈', 
      phone: '010-5678-9012', 
      email: 'choi@example.com', 
      amount: 1200000,
      status: 'inactive',
      date: '2024-02-15'
    }
  ];

  ngOnInit() {
   
  }

  onSelected(selected: any[]) {
    console.log('Selected rows:', selected);
    this.selectedcontents = selected;
  }

  doSomething(row: any) {
    alert(`Action for ${row.name}`);
  }

  // 그리드 이벤트 핸들러
  onGridRowClick(row: GridRow) {
    console.log('행 클릭:', row);
  }

  onGridRowDoubleClick(row: GridRow) {
    console.log('행 더블클릭:', row);
  }

  onGridSelectionChange(selectedRows: GridRow[]) {
    console.log('선택된 행들:', selectedRows);
  }
}
