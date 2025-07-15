import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../shared/ui-component/loading/loading.service';

/**
 * HTTP 요청 시 자동으로 로딩을 표시하는 인터셉터
 * 특정 URL이나 헤더를 통해 로딩 표시를 제어할 수 있습니다.
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  
  // 로딩을 표시하지 않을 요청들 (헤더로 제어)
  const skipLoading = req.headers.has('X-Skip-Loading');
  
  // 특정 URL 패턴에서 로딩 표시하지 않기 (예: 폴링, 헬스체크 등)
  const skipLoadingUrls = [
    '/health',
    '/ping',
    '/status'
  ];
  
  const shouldSkipLoading = skipLoading || 
    skipLoadingUrls.some(url => req.url.includes(url));
  
  if (!shouldSkipLoading) {
    // 요청 방법에 따른 메시지 설정
    let message = '처리 중...';
    let type: 'spinner' | 'dots' | 'pulse' | 'bars' = 'spinner';
    
    switch (req.method.toUpperCase()) {
      case 'GET':
        message = '데이터를 불러오는 중...';
        type = 'pulse';
        break;
      case 'POST':
        message = '데이터를 저장하는 중...';
        type = 'spinner';
        break;
      case 'PUT':
      case 'PATCH':
        message = '데이터를 수정하는 중...';
        type = 'dots';
        break;
      case 'DELETE':
        message = '데이터를 삭제하는 중...';
        type = 'bars';
        break;
      default:
        message = '처리 중...';
        type = 'spinner';
    }
    
    // 커스텀 메시지가 헤더에 있는 경우 사용
    const customMessage = req.headers.get('X-Loading-Message');
    if (customMessage) {
      message = customMessage;
    }
    
    // 커스텀 타입이 헤더에 있는 경우 사용
    const customType = req.headers.get('X-Loading-Type') as 'spinner' | 'dots' | 'pulse' | 'bars';
    if (customType && ['spinner', 'dots', 'pulse', 'bars'].includes(customType)) {
      type = customType;
    }
    
    loadingService.show(message, type);
  }
  
  return next(req).pipe(
    finalize(() => {
      if (!shouldSkipLoading) {
        loadingService.hide();
      }
    })
  );
};
