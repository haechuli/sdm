import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ControlValueAccessor,  FormsModule,  NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <button
      [style.width]="width"
      [disabled]="disabled"
      [ngClass]="[colorClass, 'btn']"
      (click)="handleClick()"
    >
      <i *ngIf="icon" [ngClass]="icon" class="btn-icon"></i>
      {{ label }}
    </button>
  `,
  styleUrls : ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() color: 'primary' | 'secondary' | 'success' | 'danger' = 'primary';
  @Input() icon?: string;
  @Input() disabled: boolean = false;
  @Input() width: string = '100px';     // ✅ 기본값 지정 가능
  @Output() clicked = new EventEmitter<void>();

  get colorClass(): string {
    return this.color;
  }

  handleClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
