import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DealerSearchCriteria, DealerInfo, DealerDetail, ComboOption } from './sa01.interface';

@Injectable({
  providedIn: 'root'
})
export class Sa01Service {

  constructor(private http: HttpClient) { }

  // 검색 조건용 콤보박스 데이터 조회
  getBranchOptions(): Observable<ComboOption[]> {
    return this.http.get<ComboOption[]>('/jsondb/BR_NO_0000.json');
  }

  getStatusOptions(): Observable<ComboOption[]> {
    return this.http.get<ComboOption[]>('/jsondb/ACTIVE_STS_0000.json');
  }

  getPartnerKindOptions(): Observable<ComboOption[]> {
    return this.http.get<ComboOption[]>('/jsondb/DLR_KIND_CD_0000.json');
  }

  // 딜러 목록 검색
  searchDealers(criteria: DealerSearchCriteria): Observable<DealerInfo[]> {
    return this.http.post<DealerInfo[]>('/api/dealer/search', criteria);
  }

  // 딜러 상세 정보 조회
  getDealerDetails(dealerId: string): Observable<DealerDetail[]> {
    return this.http.get<DealerDetail[]>(`/api/dealer/${dealerId}/details`);
  }

  // 딜러 정보 수정 페이지로 이동하기 위한 메서드
  modifyDealer(dealerId: string): void {
    // TODO: 딜러 수정 페이지로 네비게이션 구현
    console.log('Navigate to dealer modify page:', dealerId);
  }
}
