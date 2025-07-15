import { Component ,OnInit, inject} from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { InputComponent } from '../../shared/ui-component/input/input.component';
import { ComboBoxComponent } from '../../shared/ui-component/combobox/combobox.component';
import { NumberInputComponent } from '../../shared/ui-component/number-input/number-input.component';
import { ButtonComponent } from '../../shared/ui-component/button/button.component';
import { DatepickerComponent } from '../../shared/ui-component/datepicker/datepicker.component';
import { CustomerSearchComponent, Customer } from '../../shared/ui-component/customer-search/customer-search.component';
import { GridComponent } from '../../shared/ui-component/grid/grid.component';
import { GridColumn, GridRow } from '../../shared/ui-component/grid/grid.model';
import { CustomDateFormatPipe } from '../../shared/pipes/custom-date-format.pipe';
import { MaskInputComponent } from '../../shared/ui-component/mask-input/mask-input.component';
import { PageTitleComponent } from '../../shared/ui-component/page-title/page-title.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,
            InputComponent,
            ComboBoxComponent,
            NumberInputComponent,
            ButtonComponent,
            DatepickerComponent,
            CustomerSearchComponent,
            GridComponent,
            MaskInputComponent,
            PageTitleComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {


  amount = 123456789;
  amount2 = 123456789;
  fb = inject(FormBuilder);

  form = this.fb.group({
    country: [''],
    email:[''],
    numberInput:[''],
    numberInput2:[''],
    button1:[''],
    button2:[''],
    customer:[''],
    phone:[''],
    businessNumber:[''],
    zipCode:[''],
  });

  countries = [
      { label: 'South Korea', value: 'kr' },
      { label: 'USA', value: 'us' },
      { label: 'Japan', value: 'jp' }
    ];

  selectedDate: Date = new Date();

  // 그리드 설정
  gridColumns: GridColumn[] = [
    { field: 'id', header: 'ID', width: '80px', type: 'number' },
    { field: 'name', header: '고객명', width: '150px', type: 'text' },
    { field: 'phone', header: '전화번호', width: '130px', type: 'text' },
    { field: 'email', header: '이메일', width: '200px', type: 'text' },
    { field: 'address', header: '주소', width: '250px', type: 'text' },
    { field: 'company', header: '회사', width: '180px', type: 'text' },
    { field: 'department', header: '부서', width: '120px', type: 'text' },
    { field: 'position', header: '직급', width: '100px', type: 'text' },
    { field: 'amount', header: '금액', width: '120px', type: 'number' },
    { field: 'status', header: '상태', width: '100px', type: 'status' },
    { field: 'date', header: '등록일', width: '120px', type: 'date' },
    { field: 'lastLogin', header: '최종로그인', width: '140px', type: 'date' },
    { field: 'score', header: '점수', width: '80px', type: 'number' },
    { field: 'notes', header: '비고', width: '200px', type: 'text' }
  ];

  gridData: GridRow[] = [
    { 
      id: 1, 
      name: '김철수', 
      phone: '010-1234-5678', 
      email: 'kim@example.com',
      address: '서울시 강남구 테헤란로 123',
      company: '(주)테크놀로지',
      department: '개발팀',
      position: '팀장',
      amount: 1500000,
      status: 'active',
      date: '2024-01-15',
      lastLogin: '2024-03-10',
      score: 95,
      notes: '우수 고객'
    },
    { 
      id: 2, 
      name: '이영희', 
      phone: '010-2345-6789', 
      email: 'lee@example.com',
      address: '서울시 서초구 서초대로 456',
      company: '삼성전자',
      department: '마케팅팀',
      position: '과장',
      amount: 2300000,
      status: 'inactive',
      date: '2024-01-20',
      lastLogin: '2024-02-15',
      score: 87,
      notes: '장기 고객'
    },
    { 
      id: 3, 
      name: '박민수', 
      phone: '010-3456-7890', 
      email: 'park@example.com',
      address: '서울시 송파구 올림픽로 789',
      company: 'LG전자',
      department: '영업팀',
      position: '대리',
      amount: 850000,
      status: 'pending',
      date: '2024-02-01',
      lastLogin: '2024-03-05',
      score: 72,
      notes: '신규 고객'
    },
    { 
      id: 4, 
      name: '정수진', 
      phone: '010-4567-8901', 
      email: 'jung@example.com',
      address: '서울시 마포구 월드컵북로 321',
      company: '네이버',
      department: 'IT팀',
      position: '선임',
      amount: 3200000,
      status: 'active',
      date: '2024-02-10',
      lastLogin: '2024-03-12',
      score: 98,
      notes: 'VIP 고객'
    },
    { 
      id: 5, 
      name: '최동훈', 
      phone: '010-5678-9012', 
      email: 'choi@example.com',
      address: '서울시 용산구 한강대로 654',
      company: '카카오',
      department: '기획팀',
      position: '차장',
      amount: 1200000,
      status: 'inactive',
      date: '2024-02-15',
      lastLogin: '2024-01-30',
      score: 65,
      notes: '휴면 고객'
    }
  ];

  ngOnInit(): void {



  }

  onCountryChanged(event : Event) {

  }

  onSave() {
    console.log('저장되었습니다.');
    this.form.controls.numberInput.setValue("22222222222222");
 }

  onDelete() {
    console.log('삭제되었습니다.');
  }

  onCustomerSelected(customer: Customer) {
    console.log('선택된 고객:', customer);
  }

  onCustomerSearchRequested(searchTerm: string) {
    console.log('검색 요청:', searchTerm);
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
