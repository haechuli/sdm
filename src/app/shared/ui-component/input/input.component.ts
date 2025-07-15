// input.component.ts
import {  Component,  Input,  forwardRef} from '@angular/core';
import {  NG_VALUE_ACCESSOR,  ControlValueAccessor,  FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./input.component.scss'],
  template: `
    <label *ngIf="label" class="input">
      {{ label }}
    </label>
    <input
      type="text"
      class="input"
      [style.width]="width"
      [placeholder]="placeholder"
      [disabled]="isDisabled"
      [(ngModel)]="value"
      (ngModelChange)="onChange($event)"
    />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() width: string = '100px';     // ✅ 기본값 지정 가능

  value: string = '';
  isDisabled = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
