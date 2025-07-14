import { Component ,OnInit, inject} from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { InputComponent } from '../../shared/ui-component/input/input.component';
import { ComboBoxComponent } from '../../shared/ui-component/combobox/combobox.component';
import { NumberInputComponent } from '../../shared/ui-component/number-input/number-input.component';
import { ButtonComponent } from '../../shared/ui-component/button/button.component';
import { DatepickerComponent } from '../../shared/ui-component/datepicker/datepicker.component';
import { CustomerSearchComponent, Customer } from '../../shared/ui-component/customer-search/customer-search.component';
import { CustomDateFormatPipe } from '../../shared/pipes/custom-date-format.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent,ComboBoxComponent,NumberInputComponent,ButtonComponent, DatepickerComponent, CustomerSearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {


  amount = 123456789;
  amount2 = 123456789;
  fb = inject(FormBuilder);

  form = this.fb.group({
    country: [''],
    email:[''],
    numberInput:[''],
    numberInput2:[''],
    button1:[''],
    button2:[''],
    customer:['']
  });

  countries = [
      { label: 'South Korea', value: 'kr' },
      { label: 'USA', value: 'us' },
      { label: 'Japan', value: 'jp' }
    ];

  selectedDate: Date = new Date();

  ngOnInit(): void {



  }

  onCountryChanged(event : Event) {

  }

  onSave() {
    console.log('저장되었습니다.');
    this.form.controls.numberInput.setValue("22222222222222");
 }

  onDelete() {
    console.log('삭제되었습니다.');
  }

  onCustomerSelected(customer: Customer) {
    console.log('선택된 고객:', customer);
  }

  onCustomerSearchRequested(searchTerm: string) {
    console.log('검색 요청:', searchTerm);
  }
}
