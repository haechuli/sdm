
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: string;
  name: string;
  email?: string;
}

export interface LoginCredentials {
  userId: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  // 테스트용 사용자 데이터
  private readonly testUsers = [
    { id: 'admin', password: 'admin123', name: '관리자', email: 'admin@company.com' },
    { id: 'user1', password: 'password', name: '홍길동', email: 'hong@company.com' },
    { id: 'test', password: 'test', name: '테스트 사용자', email: 'test@company.com' }
  ];

  constructor(private router: Router) {
    this.checkAuthStatus();
  }

  login(credentials: LoginCredentials): Observable<{ success: boolean; message?: string; user?: User }> {
    const user = this.testUsers.find(u => 
      u.id === credentials.userId && u.password === credentials.password
    );

    if (user) {
      const authUser: User = {
        id: user.id,
        name: user.name,
        email: user.email
      };

      // 토큰과 사용자 정보를 로컬 스토리지에 저장
      const token = this.generateToken(user.id);
      localStorage.setItem('jwt_token', token);
      localStorage.setItem('current_user', JSON.stringify(authUser));

      this.isAuthenticatedSubject.next(true);
      this.currentUserSubject.next(authUser);

      return of({ success: true, user: authUser });
    } else {
      return of({ success: false, message: 'invalid_credentials' });
    }
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('current_user');
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private checkAuthStatus(): void {
    const token = this.getToken();
    const userData = localStorage.getItem('current_user');

    if (token && userData) {
      try {
        const user = JSON.parse(userData) as User;
        this.isAuthenticatedSubject.next(true);
        this.currentUserSubject.next(user);
      } catch (error) {
        this.logout();
      }
    }
  }

  private generateToken(userId: string): string {
    // 실제 환경에서는 서버에서 JWT 토큰을 생성해야 합니다
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ 
      sub: userId, 
      iat: Date.now(),
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24시간
    }));
    return `${header}.${payload}.fake-signature`;
  }
}
