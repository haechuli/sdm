import {  Component,  Input,  forwardRef,  HostListener, ViewChild, ElementRef} from '@angular/core';
import {  ControlValueAccessor,  FormsModule,  NG_VALUE_ACCESSOR} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-number-input',
  standalone: true,
  styleUrls: ['./number-input.component.scss'],
  imports: [CommonModule, FormsModule],
  template: `
    <label *ngIf="label" class="numberinput">{{ label }}</label>
    <input
      #inputEl 
      type="text"
      Class="numberinput"
      [ngClass]="{
        'text-right': align === 'right',
        'text-left': align === 'left'
      }"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [value]="displayValue"
      (input)="onInput($event)"
      (blur)="onTouched()"
    />
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumberInputComponent),
    multi: true
  }]
})
export class NumberInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() align: 'left' | 'right' = 'right';
  @ViewChild('inputEl') inputEl!: ElementRef<HTMLInputElement>;
  

  private internalValue: number | null = null;
  disabled = false;
  displayValue: string = '';

  ngAfterViewInit(): void {
    this.setCursorPosition();
  }

  onChange = (value: number | null) => {};
  onTouched = () => {};

  public writeValue(value: number | null): void {
    this.internalValue = value;
    this.displayValue = this.formatNumber(value);
    this.setCursorPosition();
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

  onInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;

    // 숫자만 남기기
    const numericValue = input.replace(/[^0-9]/g, '');
    console.log(numericValue);
   
    
    

    // 숫자가 없는 경우
    this.internalValue = numericValue ? parseInt(numericValue, 10) : null;

    // 양방향 바인딩 전달
    this.onChange(this.internalValue);

    // 표시용 포맷
    this.displayValue = this.formatNumber(this.internalValue);
  }

  formatNumber(value: number | null): string {
    if (value === null || isNaN(value)) return '';
    return value.toLocaleString('ko-KR'); // 천단위 콤마
  }

  private setCursorPosition(): void {
    if (!this.inputEl?.nativeElement) return;

    const input = this.inputEl.nativeElement;
    const length = input.value.length;

    // 오른쪽 정렬일 경우 커서를 맨 끝으로
    if (this.align === 'right') {
      input.setSelectionRange(length, length);
    } else {
      // 왼쪽 정렬일 경우 맨 앞
      input.setSelectionRange(0, 0);
    }
  }
}
