export interface SysInfo {
  timestamp: string;
  userAgent: string;
  platform: string;
  language: string;
  timezone: string;
  screenResolution: string;
  requestId: string;
}

export class SysInfoUtil {
  static generateSysInfo(): SysInfo {
    const now = new Date();
    const requestId = this.generateRequestId();
    
    return {
      timestamp: now.toISOString(),
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenResolution: `${screen.width}x${screen.height}`,
      requestId: requestId
    };
  }

  private static generateRequestId(): string {
    // UUID v4 형태의 요청 ID 생성
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  static getSysInfoForRequest(): any {
    const sysInfo = this.generateSysInfo();
    return {
      sysInfo: sysInfo
    };
  }
}
