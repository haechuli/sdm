// src/app/shared/components/datepicker/datepicker.component.ts
import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, HostListener } from '@angular/core';
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
  @Input() locale: string = 'ko'; // 기본은 한국어
  @ViewChild('inputWrapper', { static: false }) inputWrapper!: ElementRef;
  @ViewChild('calendar', { static: false }) calendar!: ElementRef;

  isOpen = false;
  showAbove = false;

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
    if (this.isOpen) {
      // 약간의 지연을 주어 DOM이 렌더링된 후 위치를 계산
      setTimeout(() => {
        this.calculatePosition();
      }, 0);
    }
  }

  calculatePosition() {
    if (!this.inputWrapper || !this.calendar) return;

    const inputRect = this.inputWrapper.nativeElement.getBoundingClientRect();
    const calendarHeight = 250; // 캘린더의 대략적인 높이
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    
    // 화면 아래쪽에 충분한 공간이 있는지 확인
    const spaceBelow = viewportHeight - (inputRect.bottom - scrollY);
    const spaceAbove = inputRect.top - scrollY;
    
    // 아래쪽 공간이 부족하고 위쪽에 충분한 공간이 있으면 위에 표시
    this.showAbove = spaceBelow < calendarHeight && spaceAbove > calendarHeight;
  }

  @HostListener('window:scroll', [])
  @HostListener('window:resize', [])
  onWindowChange() {
    if (this.isOpen) {
      this.calculatePosition();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isOpen && this.inputWrapper && this.calendar) {
      const target = event.target as HTMLElement;
      const inputElement = this.inputWrapper.nativeElement;
      const calendarElement = this.calendar.nativeElement;
      
      // 클릭한 요소가 input wrapper나 calendar 내부가 아니면 캘린더를 닫음
      if (!inputElement.contains(target) && !calendarElement.contains(target)) {
        this.isOpen = false;
      }
    }
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

  getWeekdayNames(): string[] {
    const baseDate = new Date(Date.UTC(2024, 0, 7)); // 일요일 기준
    const formatter = new Intl.DateTimeFormat(this.locale, { weekday: 'short' });

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      return formatter.format(date);
    });
  }

  getMonthName(): string {
    const date = new Date(this.currentYear, this.currentMonth);
    return new Intl.DateTimeFormat(this.locale, { month: 'long', year: 'numeric' }).format(date);
  }

}
