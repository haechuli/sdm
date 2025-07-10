// src/app/shared/components/datepicker/datepicker.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent {
  @Input() label: string = '날짜 선택';
  @Input() value: Date | null = null;
  @Output() valueChange = new EventEmitter<Date>();

  isOpen = false;

  currentMonth: number;
  currentYear: number;
  days: Date[] = [];

  constructor() {
    const today = this.value || new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.generateCalendar();
  }

  toggleCalendar() {
    this.isOpen = !this.isOpen;
  }

  selectDate(day: Date) {
    this.value = day;
    this.valueChange.emit(day);
    this.isOpen = false;
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  generateCalendar() {
    this.days = [];

    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const startDay = firstDay.getDay(); // 0 (Sun) ~ 6 (Sat)
    const lastDate = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    for (let i = 0; i < startDay; i++) {
      this.days.push(null as any); // 빈칸
    }

    for (let i = 1; i <= lastDate; i++) {
      this.days.push(new Date(this.currentYear, this.currentMonth, i));
    }
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  get weeks(): Date[][] {
    const weeks: Date[][] = [];
    for (let i = 0; i < this.days.length; i += 7) {
      weeks.push(this.days.slice(i, i + 7));
    }
    return weeks;
  }

}
