import { Component, OnInit } from '@angular/core';
import { Sa01Service } from './sa01.service';
import { ComboOption, DealerSearchCriteria } from './sa01.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sa01-test',
  standalone: true,
  template: `
    <div class="test-container">
      <h2>Environment Test</h2>
      <p><strong>Current Environment:</strong></p>
      <ul>
        <li>Production: {{ environment.production }}</li>
        <li>API URL: {{ environment.apiUrl }}</li>
        <li>Assets URL: {{ environment.assetsUrl }}</li>
      </ul>

      <h3>Combo Box Data Test</h3>
      <button (click)="testComboData()">Load Combo Data</button>
      
      <div *ngIf="branchOptions.length > 0">
        <h4>Branch Options:</h4>
        <ul>
          <li *ngFor="let option of branchOptions">{{ option.code }} - {{ option.label }}</li>
        </ul>
      </div>

      <h3>API Test</h3>
      <button (click)="testApiCall()">Test API Call</button>
      <div *ngIf="apiTestResult">
        <p>API Test Result: {{ apiTestResult }}</p>
      </div>
    </div>
  `,
  styles: [`
    .test-container {
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    button {
      margin: 10px 0;
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    ul {
      background-color: #f8f9fa;
      padding: 10px;
      border-radius: 4px;
      margin: 10px 0;
    }
  `]
})
export class Sa01TestComponent implements OnInit {
  environment = environment;
  branchOptions: ComboOption[] = [];
  apiTestResult: string = '';

  constructor(private sa01Service: Sa01Service) {}

  ngOnInit() {
    console.log('Current environment:', environment);
  }

  testComboData() {
    this.sa01Service.getBranchOptions().subscribe({
      next: (data) => {
        this.branchOptions = data;
        console.log('Branch options loaded:', data);
      },
      error: (error) => {
        console.error('Error loading branch options:', error);
        this.apiTestResult = `Combo data error: ${error.message}`;
      }
    });
  }

  testApiCall() {
    const testCriteria: DealerSearchCriteria = {
      dealerName: 'test',
      branchNo: '001'
    };

    this.sa01Service.searchDealers(testCriteria).subscribe({
      next: (data) => {
        this.apiTestResult = `API call successful! Received ${data.length} results`;
        console.log('API response:', data);
      },
      error: (error) => {
        this.apiTestResult = `API call failed: ${error.message}`;
        console.error('API error:', error);
        console.log('Request URL:', `${environment.apiUrl}/dealer/search`);
      }
    });
  }
}
