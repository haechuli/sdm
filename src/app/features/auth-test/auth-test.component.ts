import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-auth-test',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  template: `
    <div class="auth-test-container">
      <h2>🔐 JWT Login Test</h2>
      
      <div class="info-panel">
        <h3>API 연결 정보</h3>
        <ul>
          <li><strong>로그인 엔드포인트:</strong> <code>http://localhost:8080/api/auth/login</code></li>
          <li><strong>HTTP 메서드:</strong> POST</li>
          <li><strong>요청 데이터:</strong></li>
          <pre>{{requestExample}}</pre>
          <li><strong>응답 형태:</strong></li>
          <pre>{{responseExample}}</pre>
        </ul>
      </div>

      <div class="login-section">
        <h3>로그인 테스트</h3>
        <app-login></app-login>
      </div>

      <div class="backend-setup">
        <h3>🚀 백엔드 서버 설정</h3>
        <p>테스트를 위해 백엔드 서버가 다음과 같이 구현되어야 합니다:</p>
        <div class="code-example">
          <h4>Spring Boot 예시:</h4>
          <pre><code>&#64;PostMapping("/api/auth/login")
public ResponseEntity&lt;LoginResponse&gt; login(&#64;RequestBody LoginRequest request) {{ '{' }}
    // 사용자 인증 로직
    if (isValidUser(request.getUserId(), request.getPassword())) {{ '{' }}
        String token = jwtTokenProvider.generateToken(request.getUserId());
        User user = userService.findByUserId(request.getUserId());
        
        return ResponseEntity.ok(LoginResponse.builder()
            .success(true)
            .token(token)
            .user(user)
            .build());
    {{ '}' }} else {{ '{' }}
        return ResponseEntity.ok(LoginResponse.builder()
            .success(false)
            .message("Invalid credentials")
            .build());
    {{ '}' }}
{{ '}' }}</code></pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-test-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .info-panel, .login-section, .backend-setup {
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }

    .info-panel h3, .login-section h3, .backend-setup h3 {
      color: #495057;
      margin-top: 0;
    }

    .info-panel ul {
      margin: 10px 0;
      padding-left: 20px;
    }

    .info-panel li {
      margin: 8px 0;
    }

    code {
      background: #e9ecef;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }

    pre {
      background: #2d3748;
      color: #e2e8f0;
      padding: 15px;
      border-radius: 6px;
      overflow-x: auto;
      font-size: 0.9em;
      margin: 10px 0;
    }

    .code-example {
      margin: 15px 0;
    }

    .code-example h4 {
      margin: 15px 0 5px 0;
      color: #2c5282;
    }

    h2 {
      color: #2c5282;
      text-align: center;
      margin-bottom: 30px;
    }
  `]
})
export class AuthTestComponent {
  requestExample = `{
  "userId": "admin",
  "password": "admin123"
}`;

  responseExample = `{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "admin",
    "name": "관리자",
    "email": "admin@company.com"
  }
}`;
}
