import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sa01Service } from './sa01.service';
import { DealerSearchCriteria, DealerInfo, DealerDetail, ComboOption } from './sa01.interface';

// UI Components imports
import { ButtonComponent } from '../../../shared/ui-component/button/button.component';
import { ComboBoxComponent } from '../../../shared/ui-component/combobox/combobox.component';
import { InputComponent } from '../../../shared/ui-component/input/input.component';
import { GridComponent } from '../../../shared/ui-component/grid/grid.component';
import { LoadingComponent } from '../../../shared/ui-component/loading/loading.component';
import { PageTitleComponent } from '../../../shared/ui-component/page-title/page-title.component';

@Component({
  selector: 'app-sa01',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    ComboBoxComponent,
    InputComponent,
    GridComponent,
    LoadingComponent,
    PageTitleComponent
  ],
  templateUrl: './sa01.component.html',
  styleUrls: ['./sa01.component.scss']
})
export class Sa01Component implements OnInit {

  // 검색 조건
  searchCriteria: DealerSearchCriteria = {
    brNo: '',
    name: '',
    status: '',
    fullName: '',
    dlrKndCd: '',
    bankAccountName: '',
    npwp: '',
    address: ''
  };

  // 데이터
  dealerList: DealerInfo[] = [];
  dealerDetails: DealerDetail[] = [];
  selectedDealer: DealerInfo | null = null;
  loading = false;

  // 콤보박스 옵션들 (ComboBox 컴포넌트 형식으로 변환)
  branchOptions: any[] = [];
  statusOptions: any[] = [];
  partnerKindOptions: any[] = [];

  // 그리드 컬럼 정의
  dealerListColumns = [
    { field: 'name', header: 'Name', width: '158px' },
    { field: 'dlrKndNm', header: 'Partner Kind', width: '83px' },
    { field: 'address1', header: 'Address1', width: '300px' },
    { field: 'address2', header: 'Address2', width: '174px' },
    { field: 'city', header: 'City', width: '130px' },
    { field: 'postalCode', header: 'Postal Code', width: '110px' },
    { field: 'telephone', header: 'Telephone', width: '116px' },
    { field: 'fax', header: 'Fax', width: '100px' },
    { field: 'email', header: 'E-mail', width: '150px' },
    { field: 'statusNm', header: 'Status', width: '70px' },
    { field: 'brNo', header: 'Br No', width: '50px' }
  ];

  dealerDetailColumns = [
    { field: 'dealerId', header: 'Dealer ID', width: '100px' },
    { field: 'fullName', header: 'Full Name', width: '270px' },
    { field: 'nickName', header: 'Nick Name', width: '135px' },
    { field: 'idNo', header: 'ID No', width: '125px' },
    { field: 'birthDt', header: 'Date of Birth', width: '100px' },
    { field: 'contactTelephone', header: 'Telephone', width: '125px' },
    { field: 'contactEmail', header: 'Email', width: '110px' },
    { field: 'contactMobile', header: 'Mobile', width: '116px' },
    { field: 'dealerDvNm', header: 'Personal/Corp.', width: '100px' },
    { field: 'corporateTaxNm', header: 'PKP/Non PKP.', width: '100px' },
    { field: 'npwp', header: 'NPWP', width: '150px' },
    { field: 'bankAccountName', header: 'Bank Account Name', width: '200px' },
    { field: 'bankNm', header: 'Bank', width: '91px' },
    { field: 'accountNo', header: 'Acct. No.', width: '120px' }
  ];

  constructor(private sa01Service: Sa01Service) { }

  ngOnInit(): void {
    this.loadComboOptions();
  }

  // 콤보박스 옵션 로드
  private loadComboOptions(): void {
    this.sa01Service.getBranchOptions().subscribe({
      next: (data) => {
        this.branchOptions = data.map(item => ({
          label: item.codeNm,
          value: item.code
        }));
      },
      error: (error) => console.error('Error loading branch options:', error)
    });

    this.sa01Service.getStatusOptions().subscribe({
      next: (data) => {
        this.statusOptions = data.map(item => ({
          label: item.codeNm,
          value: item.code
        }));
      },
      error: (error) => console.error('Error loading status options:', error)
    });

    this.sa01Service.getPartnerKindOptions().subscribe({
      next: (data) => {
        this.partnerKindOptions = data.map(item => ({
          label: item.codeNm,
          value: item.code
        }));
      },
      error: (error) => console.error('Error loading partner kind options:', error)
    });
  }

  // 딜러 검색
  onSearch(): void {
    this.loading = true;
    this.sa01Service.searchDealers(this.searchCriteria).subscribe({
      next: (data) => {
        this.dealerList = data;
        this.dealerDetails = [];
        this.selectedDealer = null;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error searching dealers:', error);
        this.loading = false;
      }
    });
  }

  // 딜러 선택 (그리드 클릭)
  onDealerSelect(row: any): void {
    const dealer = row as DealerInfo;
    this.selectedDealer = dealer;
    this.loadDealerDetails(dealer.dealerId);
  }

  // 딜러 상세 정보 로드
  private loadDealerDetails(dealerId: string): void {
    this.sa01Service.getDealerDetails(dealerId).subscribe({
      next: (data) => this.dealerDetails = data,
      error: (error) => console.error('Error loading dealer details:', error)
    });
  }

  // 딜러 수정
  onDealerModify(): void {
    if (this.selectedDealer) {
      this.sa01Service.modifyDealer(this.selectedDealer.dealerId);
    }
  }

  // 딜러 상세 더블클릭
  onDealerDetailDoubleClick(row: any): void {
    const detail = row as DealerDetail;
    // TODO: 상세 정보 처리 로직 구현
    console.log('Dealer detail double clicked:', detail);
  }

  // 검색 조건 초기화
  onReset(): void {
    this.searchCriteria = {
      brNo: '',
      name: '',
      status: '',
      fullName: '',
      dlrKndCd: '',
      bankAccountName: '',
      npwp: '',
      address: ''
    };
    this.dealerList = [];
    this.dealerDetails = [];
    this.selectedDealer = null;
  }
}
