import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface ComboOption {
  label: string;
  value: any;
}

@Component({
  standalone: true,
  selector: 'app-combobox',
  imports: [CommonModule],  // 여기에 추가
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboBoxComponent),
      multi: true
    }
  ]
})
export class ComboBoxComponent implements ControlValueAccessor {
  @Input() options: ComboOption[] = [];
  @Input() placeholder: string = 'Select an option';
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Output() selectionChange = new EventEmitter<any>();

  value: any = null;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.value = selectedValue;
    this.onChange(selectedValue);
    this.selectionChange.emit(selectedValue);
  }
}
