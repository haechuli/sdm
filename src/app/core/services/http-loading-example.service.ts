import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { LoadingService } from '../../shared/ui-component/loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class HttpLoadingExampleService {

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) { }

  /**
   * 방법 1: LoadingService의 withLoading 메서드 사용
   */
  async getUserDataWithService(userId: string): Promise<any> {
    const request = lastValueFrom(
      this.http.get(`/api/users/${userId}`)
    );
    
    return this.loadingService.withLoading(
      request,
      '사용자 정보를 불러오는 중...',
      'pulse',
      'medium'
    );
  }

  /**
   * 방법 2: 수동으로 로딩 제어
   */
  async saveUserDataManual(userData: any): Promise<any> {
    this.loadingService.show('사용자 정보를 저장하는 중...', 'spinner', 'medium');
    
    try {
      const result = await lastValueFrom(
        this.http.post('/api/users', userData)
      );
      this.loadingService.hide();
      return result;
    } catch (error) {
      this.loadingService.hide();
      throw error;
    }
  }

  /**
   * 방법 3: 인터셉터가 자동으로 처리 (기본 동작)
   */
  getUsers(): Observable<any> {
    return this.http.get('/api/users');
  }

  /**
   * 방법 4: 로딩을 표시하지 않는 요청 (헤더 사용)
   */
  getHealthCheck(): Observable<any> {
    const headers = new HttpHeaders({
      'X-Skip-Loading': 'true'
    });
    
    return this.http.get('/api/health', { headers });
  }

  /**
   * 방법 5: 커스텀 로딩 메시지와 타입 (헤더 사용)
   */
  deleteUser(userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-Loading-Message': '사용자를 삭제하는 중입니다...',
      'X-Loading-Type': 'bars'
    });
    
    return this.http.delete(`/api/users/${userId}`, { headers });
  }

  /**
   * 방법 6: 파일 업로드 시 진행률 표시
   */
  async uploadFileWithProgress(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    this.loadingService.show('파일을 업로드하는 중...', 'dots', 'large');

    try {
      const result = await lastValueFrom(
        this.http.post('/api/upload', formData, {
          headers: new HttpHeaders({
            'X-Skip-Loading': 'true' // 수동으로 제어하므로 인터셉터 로딩 비활성화
          })
        })
      );
      this.loadingService.hide();
      return result;
    } catch (error) {
      this.loadingService.hide();
      throw error;
    }
  }
}
