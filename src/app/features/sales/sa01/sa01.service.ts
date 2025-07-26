import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DealerSearchCriteria, DealerInfo, DealerDetail, ComboOption } from './sa01.interface';
import { environment } from '../../../../environments/environment';
import { HttpOptionsUtil } from '../../../core/utils/http-options.util';

@Injectable({
  providedIn: 'root'
})
export class Sa01Service {

  private readonly dataBasePath = environment.assetsUrl;
  private readonly apiBasePath = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // 검색 조건용 콤보박스 데이터 조회
  // 콤보박스 데이터를 가져오는 메서드들 (assets 폴더에서 정적 데이터 - SysInfo 제외)
  getBranchOptions(): Observable<ComboOption[]> {
    // 정적 파일 요청이므로 sysinfo 제외
    return this.http.get<ComboOption[]>(`${this.dataBasePath}/BR_NO_0000.json`, 
      HttpOptionsUtil.getOptionsWithoutSysInfo());
  }

  getStatusOptions(): Observable<ComboOption[]> {
    // 정적 파일 요청이므로 sysinfo 제외
    return this.http.get<ComboOption[]>(`${this.dataBasePath}/ACTIVE_STS_0000.json`, 
      HttpOptionsUtil.getOptionsWithoutSysInfo());
  }

  getPartnerKindOptions(): Observable<ComboOption[]> {
    // 정적 파일 요청이므로 sysinfo 제외
    return this.http.get<ComboOption[]>(`${this.dataBasePath}/DLR_KIND_CD_0000.json`, 
      HttpOptionsUtil.getOptionsWithoutSysInfo());
  }

  // API 호출 메서드들 (서버 API - SysInfo 자동 포함)
  searchDealers(criteria: DealerSearchCriteria): Observable<DealerInfo[]> {
    // 이 요청에는 sysinfo가 자동으로 포함됩니다
    return this.http.post<DealerInfo[]>(`${this.apiBasePath}/dealer/list`, { input: criteria });
  }

  // 딜러 상세 정보 조회
  getDealerDetails(dealerId: string): Observable<DealerDetail[]> {
    // 이 GET 요청에는 sysinfo가 query parameter로 자동 추가됩니다
    return this.http.get<DealerDetail[]>(`${this.apiBasePath}/dealer/${dealerId}/details`);
  }

  // 딜러 정보 수정 페이지로 이동하기 위한 메서드
  modifyDealer(dealerId: string): void {
    // TODO: 딜러 수정 페이지로 네비게이션 구현
    console.log('Navigate to dealer modify page:', dealerId);
  }
}
