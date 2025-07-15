import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  type?: 'spinner' | 'dots' | 'pulse' | 'bars';
  size?: 'small' | 'medium' | 'large';
}

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<LoadingState>({
    isLoading: false
  });

  public loading$: Observable<LoadingState> = this.loadingSubject.asObservable();

  constructor() { }

  /**
   * 로딩 시작
   * @param message 로딩 메시지
   * @param type 로딩 애니메이션 타입
   * @param size 로딩 크기
   */
  show(message: string = '로딩 중...', type: 'spinner' | 'dots' | 'pulse' | 'bars' = 'spinner', size: 'small' | 'medium' | 'large' = 'medium'): void {
    this.loadingSubject.next({
      isLoading: true,
      message,
      type,
      size
    });
  }

  /**
   * 로딩 종료
   */
  hide(): void {
    this.loadingSubject.next({
      isLoading: false
    });
  }

  /**
   * 현재 로딩 상태 반환
   */
  get isLoading(): boolean {
    return this.loadingSubject.value.isLoading;
  }

  /**
   * HTTP 요청과 함께 로딩 표시
   * @param promise HTTP 요청 Promise
   * @param message 로딩 메시지
   * @param type 로딩 애니메이션 타입
   * @param size 로딩 크기
   */
  async withLoading<T>(
    promise: Promise<T>, 
    message: string = '데이터를 불러오는 중...', 
    type: 'spinner' | 'dots' | 'pulse' | 'bars' = 'spinner',
    size: 'small' | 'medium' | 'large' = 'medium'
  ): Promise<T> {
    this.show(message, type, size);
    try {
      const result = await promise;
      this.hide();
      return result;
    } catch (error) {
      this.hide();
      throw error;
    }
  }
}
