// input.component.ts
import {  Component,  Input,  forwardRef} from '@angular/core';
import {  NG_VALUE_ACCESSOR,  ControlValueAccessor,  FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <label *ngIf="label" class="block mb-1 text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <input
      type="text"
      class="border border-gray-300 rounded-md px-3 py-2 w-full"
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
