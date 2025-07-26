
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, catchError, map } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

export interface UserInfo {
  id: string;
  name: string;
  email?: string;
}

export interface LoginCredentials {
  userId: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  userInfo?: UserInfo;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<UserInfo | null>(null);

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkAuthStatus();
  }

  login(credentials: LoginCredentials): Observable<{ success: boolean; message?: string; user?: UserInfo }> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        map(response => {
          if (response.token && response.userInfo) {
            // JWT 토큰과 사용자 정보를 로컬 스토리지에 저장
            localStorage.setItem('jwt_token', response.token);
            localStorage.setItem('current_user', JSON.stringify(response.userInfo));

            this.isAuthenticatedSubject.next(true);
            this.currentUserSubject.next(response.userInfo);

            return { success: true, user: response.userInfo };
          } else {
            return { success: false, message: response.message || 'login_failed' };
          }
        }),
        catchError((error) => {
          console.error('Login error:', error);
          let errorMessage = 'login_failed';
          
          // HTTP 상태 코드에 따른 에러 메시지 처리
          if (error.status === 401) {
            errorMessage = 'invalid_credentials';
          } else if (error.status === 403) {
            errorMessage = 'access_denied';
          } else if (error.status === 0) {
            errorMessage = 'network_error';
          }
          
          return of({ success: false, message: errorMessage });
        })
      );
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

  getCurrentUser(): UserInfo | null {
    return this.currentUserSubject.value;
  }

  private checkAuthStatus(): void {
    const token = this.getToken();
    const userData = localStorage.getItem('current_user');

    if (token && userData) {
      try {
        const user = JSON.parse(userData) as UserInfo;
        this.isAuthenticatedSubject.next(true);
        this.currentUserSubject.next(user);
      } catch (error) {
        this.logout();
      }
    }
  }
}
