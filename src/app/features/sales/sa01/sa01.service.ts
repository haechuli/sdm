import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DealerSearchCriteria, DealerInfo, DealerDetail, ComboOption } from './sa01.interface';

@Injectable({
  providedIn: 'root'
})
export class Sa01Service {

  private readonly dataBasePath = '/assets/data';
  private readonly apiBasePath = '/api';

  constructor(private http: HttpClient) { }

  // 검색 조건용 콤보박스 데이터 조회
  // 콤보박스 데이터를 가져오는 메서드들 (assets 폴더에서 정적 데이터)
  getBranchOptions(): Observable<ComboOption[]> {
    return this.http.get<ComboOption[]>(`${this.dataBasePath}/BR_NO_0000.json`);
  }

  getStatusOptions(): Observable<ComboOption[]> {
    return this.http.get<ComboOption[]>(`${this.dataBasePath}/ACTIVE_STS_0000.json`);
  }

  getPartnerKindOptions(): Observable<ComboOption[]> {
    return this.http.get<ComboOption[]>(`${this.dataBasePath}/DLR_KIND_CD_0000.json`);
  }

  // API 호출 메서드들 (서버 API)
  searchDealers(criteria: DealerSearchCriteria): Observable<DealerInfo[]> {
    return this.http.post<DealerInfo[]>(`${this.apiBasePath}/dealer/search`, criteria);
  }

  // 딜러 상세 정보 조회
  getDealerDetails(dealerId: string): Observable<DealerDetail[]> {
    return this.http.get<DealerDetail[]>(`${this.apiBasePath}/dealer/${dealerId}/details`);
  }

  // 딜러 정보 수정 페이지로 이동하기 위한 메서드
  modifyDealer(dealerId: string): void {
    // TODO: 딜러 수정 페이지로 네비게이션 구현
    console.log('Navigate to dealer modify page:', dealerId);
  }
}
