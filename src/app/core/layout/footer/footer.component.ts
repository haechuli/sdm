import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatepickerComponent } from '../../../shared/ui-component/datepicker/datepicker.component';
import { ComboBoxComponent } from '../../../shared/ui-component/combobox/combobox.component';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatepickerComponent, ComboBoxComponent, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  branch = '서울지점';
  branches = [
    { label: '서울지점', value: '0001' },
    { label: '부산지점', value: '0002' },
    { label: '대구지점', value: '0003' },
    { label: '인천지점', value: '0004' },
    { label: '광주지점', value: '0005' }
  ];

  tradingDate: Date = new Date();
  currentTime: string = '';

  constructor() {
    this.updateTime();
    // 1초마다 시간 업데이트
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  onBranchChanged(event: Event) {
    // 지점 변경 로직
  }

  private updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
}
