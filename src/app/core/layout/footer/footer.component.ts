import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatepickerComponent } from '../../../shared/ui-component/datepicker/datepicker.component';
import { ComboBoxComponent } from '../../../shared/ui-component/combobox/combobox.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatepickerComponent, ComboBoxComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  branch = '서울지점';
  branches = [
    { label: '서울지점', value: '0001' },
    { label: '부산지점', value: '0002' },
    { label: '대구지점', value: '0003' }
  ];

  tradingDate: Date = new Date();

  onBranchChanged(event : Event) {

  }
}
