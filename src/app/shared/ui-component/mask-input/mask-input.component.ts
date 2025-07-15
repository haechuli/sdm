import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-mask-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mask-input.component.html',
  styleUrls: ['./mask-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MaskInputComponent),
      multi: true
    }
  ]
})
export class MaskInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() mask: string = ''; // 예: '000-000-0000', 'AAA-000', etc.
  @Input() width: string = '100%';
  @Input() disabled: boolean = false;
  @Output() valueChange = new EventEmitter<string>();

  value: string = '';
  displayValue: string = '';
  private onChange = (value: string) => {};
  private onTouched = () => {};

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const rawValue = this.getRawValue(target.value);
    const maskedValue = this.applyMask(rawValue);

    this.displayValue = maskedValue;
    this.value = rawValue;
    target.value = maskedValue;

    this.onChange(rawValue);
    this.valueChange.emit(rawValue);
  }

  onBlur(): void {
    this.onTouched();
  }

  private getRawValue(maskedValue: string): string {
    if (!this.mask) return maskedValue;

    return maskedValue.replace(/[^A-Za-z0-9]/g, '');
  }

  private applyMask(rawValue: string): string {
    if (!this.mask || !rawValue) return rawValue;

    let maskedValue = '';
    let rawIndex = 0;

    for (let i = 0; i < this.mask.length && rawIndex < rawValue.length; i++) {
      const maskChar = this.mask[i];
      const rawChar = rawValue[rawIndex];

      if (maskChar === '0') { // 숫자만
        if (/\d/.test(rawChar)) {
          maskedValue += rawChar;
          rawIndex++;
        } else {
          break;
        }
      } else if (maskChar === 'A') { // 문자만
        if (/[A-Za-z]/.test(rawChar)) {
          maskedValue += rawChar.toUpperCase();
          rawIndex++;
        } else {
          break;
        }
      } else if (maskChar === '*') { // 문자 또는 숫자
        if (/[A-Za-z0-9]/.test(rawChar)) {
          maskedValue += rawChar;
          rawIndex++;
        } else {
          break;
        }
      } else { // 구분자
        maskedValue += maskChar;
      }
    }

    return maskedValue;
  }

  writeValue(value: string): void {
    this.value = value || '';
    this.displayValue = this.applyMask(this.value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
