import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpOptionsUtil } from '../../core/utils/http-options.util';
import { SysInfoUtil, SysInfo } from '../../core/utils/sysinfo.util';

@Component({
  selector: 'app-sysinfo-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sysinfo-test-container">
      <h2>🔧 SysInfo 인터셉터 테스트</h2>
      
      <div class="info-section">
        <h3>현재 시스템 정보</h3>
        <div class="sysinfo-display">
          <pre>{{ currentSysInfo | json }}</pre>
        </div>
      </div>

      <div class="test-section">
        <h3>테스트 버튼들</h3>
        <div class="button-group">
          <button (click)="testGetWithSysInfo()" class="btn btn-primary">
            GET 요청 (SysInfo 포함)
          </button>
          
          <button (click)="testGetWithoutSysInfo()" class="btn btn-secondary">
            GET 요청 (SysInfo 제외)
          </button>
          
          <button (click)="testPostWithSysInfo()" class="btn btn-primary">
            POST 요청 (SysInfo 포함)
          </button>
          
          <button (click)="testPostWithoutSysInfo()" class="btn btn-secondary">
            POST 요청 (SysInfo 제외)
          </button>
        </div>
      </div>

      <div class="result-section" *ngIf="testResults.length > 0">
        <h3>테스트 결과</h3>
        <div class="results">
          <div *ngFor="let result of testResults" class="result-item">
            <h4>{{ result.title }}</h4>
            <div class="request-info">
              <strong>요청 URL:</strong> {{ result.url }}<br>
              <strong>요청 메서드:</strong> {{ result.method }}<br>
              <strong>SysInfo 포함:</strong> {{ result.hasSysInfo ? 'Yes' : 'No' }}
            </div>
            <pre class="result-data">{{ result.data | json }}</pre>
          </div>
        </div>
      </div>

      <div class="usage-section">
        <h3>📖 사용법</h3>
        <div class="usage-examples">
          <h4>일반적인 사용 (SysInfo 자동 포함):</h4>
          <pre><code>// GET 요청 - sysinfo가 query parameter로 자동 추가
this.http.get('/api/data').subscribe(response => {{ '{' }}
  console.log(response);
{{ '}' }});

// POST 요청 - sysinfo가 body에 자동 추가
this.http.post('/api/data', {{ '{' }} name: 'test' {{ '}' }}).subscribe(response => {{ '{' }}
  console.log(response);
{{ '}' }});</code></pre>

          <h4>SysInfo 제외하고 싶은 경우:</h4>
          <pre><code>// SysInfo 제외 옵션 사용
import {{ '{' }} HttpOptionsUtil {{ '}' }} from './core/utils/http-options.util';

// GET 요청에서 SysInfo 제외
this.http.get('/api/data', HttpOptionsUtil.getOptionsWithoutSysInfo())
  .subscribe(response => {{ '{' }}
    console.log(response);
  {{ '}' }});

// POST 요청에서 SysInfo 제외
this.http.post('/api/data', data, HttpOptionsUtil.getOptionsWithoutSysInfo())
  .subscribe(response => {{ '{' }}
    console.log(response);
  {{ '}' }});</code></pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sysinfo-test-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .info-section, .test-section, .result-section, .usage-section {
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }

    .sysinfo-display {
      background: #2d3748;
      color: #e2e8f0;
      padding: 15px;
      border-radius: 6px;
      overflow-x: auto;
      font-size: 0.9em;
    }

    .button-group {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
    }

    .btn-primary {
      background: #007bff;
      color: white;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn:hover {
      opacity: 0.8;
    }

    .result-item {
      background: white;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 15px;
      margin: 10px 0;
    }

    .request-info {
      margin: 10px 0;
      font-size: 0.9em;
    }

    .result-data {
      background: #2d3748;
      color: #e2e8f0;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 0.8em;
      margin: 10px 0;
    }

    .usage-examples pre {
      background: #2d3748;
      color: #e2e8f0;
      padding: 15px;
      border-radius: 6px;
      overflow-x: auto;
      font-size: 0.9em;
    }

    h2 {
      color: #2c5282;
      text-align: center;
      margin-bottom: 30px;
    }

    h3 {
      color: #495057;
      margin-top: 0;
    }

    h4 {
      color: #2c5282;
      margin: 15px 0 5px 0;
    }
  `]
})
export class SysInfoTestComponent implements OnInit {
  currentSysInfo!: SysInfo;
  testResults: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.currentSysInfo = SysInfoUtil.generateSysInfo();
  }

  testGetWithSysInfo() {
    const testUrl = '/api/test-get';
    this.http.get(testUrl).subscribe({
      next: (response) => {
        this.addTestResult('GET 요청 (SysInfo 포함)', 'GET', testUrl, true, response);
      },
      error: (error) => {
        this.addTestResult('GET 요청 (SysInfo 포함)', 'GET', testUrl, true, error);
      }
    });
  }

  testGetWithoutSysInfo() {
    const testUrl = '/api/test-get';
    this.http.get(testUrl, HttpOptionsUtil.getOptionsWithoutSysInfo()).subscribe({
      next: (response) => {
        this.addTestResult('GET 요청 (SysInfo 제외)', 'GET', testUrl, false, response);
      },
      error: (error) => {
        this.addTestResult('GET 요청 (SysInfo 제외)', 'GET', testUrl, false, error);
      }
    });
  }

  testPostWithSysInfo() {
    const testUrl = '/api/test-post';
    const testData = { name: 'test', value: 123 };
    
    this.http.post(testUrl, testData).subscribe({
      next: (response) => {
        this.addTestResult('POST 요청 (SysInfo 포함)', 'POST', testUrl, true, response);
      },
      error: (error) => {
        this.addTestResult('POST 요청 (SysInfo 포함)', 'POST', testUrl, true, error);
      }
    });
  }

  testPostWithoutSysInfo() {
    const testUrl = '/api/test-post';
    const testData = { name: 'test', value: 123 };
    
    this.http.post(testUrl, testData, HttpOptionsUtil.getOptionsWithoutSysInfo()).subscribe({
      next: (response) => {
        this.addTestResult('POST 요청 (SysInfo 제외)', 'POST', testUrl, false, response);
      },
      error: (error) => {
        this.addTestResult('POST 요청 (SysInfo 제외)', 'POST', testUrl, false, error);
      }
    });
  }

  private addTestResult(title: string, method: string, url: string, hasSysInfo: boolean, data: any) {
    this.testResults.unshift({
      title,
      method,
      url,
      hasSysInfo,
      data,
      timestamp: new Date().toLocaleTimeString()
    });
    
    // 최대 10개의 결과만 유지
    if (this.testResults.length > 10) {
      this.testResults = this.testResults.slice(0, 10);
    }
  }
}
