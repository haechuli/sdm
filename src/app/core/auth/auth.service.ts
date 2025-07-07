
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  getToken(): string | null {
    // 일반적으로 로컬스토리지에 저장
    return localStorage.getItem('jwt_token');
  }
}
