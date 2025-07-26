import { HttpHeaders } from '@angular/common/http';

export class HttpOptionsUtil {
  /**
   * sysinfo를 제외하고 HTTP 요청을 보내고 싶을 때 사용하는 헤더 옵션
   */
  static getOptionsWithoutSysInfo() {
    return {
      headers: new HttpHeaders({
        'X-Skip-SysInfo': 'true'
      })
    };
  }

  /**
   * 특정 헤더와 함께 sysinfo를 제외하고 싶을 때 사용
   */
  static getOptionsWithAdditionalHeaders(additionalHeaders: { [key: string]: string } = {}) {
    const headers = new HttpHeaders({
      'X-Skip-SysInfo': 'true',
      ...additionalHeaders
    });
    
    return { headers };
  }

  /**
   * Content-Type을 지정하면서 sysinfo를 제외하고 싶을 때 사용
   */
  static getOptionsWithContentTypeNoSysInfo(contentType: string) {
    return {
      headers: new HttpHeaders({
        'X-Skip-SysInfo': 'true',
        'Content-Type': contentType
      })
    };
  }
}
