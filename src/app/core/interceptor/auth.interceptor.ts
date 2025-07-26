import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SysInfoUtil } from '../utils/sysinfo.util';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  // sysinfo 제외 헤더가 있는지 확인
  const skipSysInfo = req.headers.has('X-Skip-SysInfo');
  
  let modifiedReq = req;

  // sysinfo 제외가 요청되지 않은 경우에만 sysinfo 추가
  if (!skipSysInfo) {
    // sysinfo 객체 생성
    const sysInfoData = SysInfoUtil.getSysInfoForRequest();
    
    // GET 요청의 경우 query parameter로 sysinfo 추가
    if (req.method === 'GET') {
      const sysInfoParam = encodeURIComponent(JSON.stringify(sysInfoData.sysInfo));
      const separator = req.url.includes('?') ? '&' : '?';
      const newUrl = `${req.url}${separator}sysinfo=${sysInfoParam}`;
      
      modifiedReq = req.clone({ url: newUrl });
    } 
    // POST, PUT, PATCH 요청의 경우 body에 sysinfo 추가
    else if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      let newBody;
      
      if (req.body) {
        // 기존 body가 있는 경우 sysinfo와 병합
        if (typeof req.body === 'string') {
          try {
            const existingBody = JSON.parse(req.body);
            newBody = { ...existingBody, ...sysInfoData };
          } catch {
            // JSON이 아닌 경우 FormData 등의 처리
            newBody = req.body;
          }
        } else if (req.body instanceof FormData) {
          // FormData의 경우 새로운 FormData를 생성하고 기존 데이터 복사
          const formData = new FormData();
          // 기존 FormData의 모든 항목을 새 FormData에 복사
          (req.body as FormData).forEach((value, key) => {
            formData.append(key, value);
          });
          // sysinfo 추가
          formData.append('sysinfo', JSON.stringify(sysInfoData.sysInfo));
          newBody = formData;
        } else {
          // 객체인 경우 직접 병합
          newBody = { ...req.body, ...sysInfoData };
        }
      } else {
        // body가 없는 경우 sysinfo만 추가
        newBody = sysInfoData;
      }
      
      modifiedReq = req.clone({ body: newBody });
    }
  }

  // X-Skip-SysInfo 헤더 제거 (서버로 전송하지 않기 위해)
  if (skipSysInfo) {
    modifiedReq = modifiedReq.clone({
      headers: req.headers.delete('X-Skip-SysInfo')
    });
  }

  // JWT 토큰이 있는 경우 Authorization 헤더 추가
  if (token) {
    modifiedReq = modifiedReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(modifiedReq);
};
