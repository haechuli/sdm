import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnInit, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';

import { TranslatePipe } from '../../pipes/translate.pipe';
import { InputComponent } from '../input/input.component';

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  address?: string;
}

@Component({
  selector: 'app-customer-search',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent, ButtonComponent, TranslatePipe],
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomerSearchComponent),
      multi: true
    }
  ]
})
export class CustomerSearchComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() customerId: string = '';
  @Input() customers: Customer[] = [];
  @Input() id_width: string = '100px';     // ✅ 기본값 지정 가능
  @Input() name_width: string = '300px';     // ✅ 기본값 지정 가능

  @Output() customerSelected = new EventEmitter<Customer>();
  @Output() searchRequested = new EventEmitter<string>();

  @ViewChild('popup', { static: false }) popup!: ElementRef;
  @ViewChild('customerInput', { static: false }) customerInput!: ElementRef;

  selectedCustomer: Customer | null = null;
  customerName: string = '';
  isPopupOpen: boolean = false;
  filteredCustomers: Customer[] = [];
  searchTerm: string = '';

  // ControlValueAccessor properties
  value: Customer | null = null;
  onChange = (value: Customer | null) => {};
  onTouched = () => {};

  // 샘플 고객 데이터
  private sampleCustomers: Customer[] = [
    { id: '001', name: '김철수', phone: '010-1234-5678', address: '서울시 강남구' },
    { id: '002', name: '이영희', phone: '010-2345-6789', address: '서울시 서초구' },
    { id: '003', name: '박민수', phone: '010-3456-7890', address: '서울시 송파구' },
    { id: '004', name: '정수진', phone: '010-4567-8901', address: '서울시 마포구' },
    { id: '005', name: '최동훈', phone: '010-5678-9012', address: '서울시 용산구' },
    { id: '006', name: 'John Smith', phone: '010-6789-0123', address: 'Seoul Gangnam-gu' },
    { id: '007', name: 'Maria Garcia', phone: '010-7890-1234', address: 'Seoul Seocho-gu' },
    { id: '008', name: 'Ahmad Rahman', phone: '010-8901-2345', address: 'Seoul Songpa-gu' }
  ];

  ngOnInit() {
    // 고객 데이터가 전달되지 않은 경우 샘플 데이터 사용
    if (this.customers.length === 0) {
      this.customers = this.sampleCustomers;
    }
  }

  openSearchPopup() {
    if (this.disabled) return;

    this.isPopupOpen = true;
    this.filteredCustomers = [...this.customers];
    this.searchTerm = '';
    this.onTouched();
  }

  closePopup() {
    this.isPopupOpen = false;
    this.searchTerm = '';
  }

  searchCustomers() {
    if (this.searchTerm.trim()) {
      this.filteredCustomers = this.customers.filter(customer =>
        customer.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        customer.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.searchRequested.emit(this.searchTerm);
    } else {
      this.filteredCustomers = [...this.customers];
    }
  }

  selectCustomer(customer: Customer) {
    this.selectedCustomer = customer;
    this.customerName = customer.name;
    this.customerId = customer.id;
    this.value = customer;

    this.onChange(customer);
    this.customerSelected.emit(customer);
    this.closePopup();
  }

  clearSelection() {
    this.selectedCustomer = null;
    this.customerName = '';
    this.customerId = '';
    this.value = null;
    this.onChange(null);
  }

  trackByCustomerId(index: number, customer: Customer): string {
    return customer.id;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.isPopupOpen && this.popup) {
      const clickedInside = this.popup.nativeElement.contains(event.target as Node);
      const clickedInput = this.customerInput?.nativeElement.contains(event.target as Node);

      if (!clickedInside && !clickedInput) {
        this.closePopup();
      }
    }
  }

  @HostListener('keydown.escape')
  onEscapeKey() {
    if (this.isPopupOpen) {
      this.closePopup();
    }
  }

  // ControlValueAccessor methods
  writeValue(value: Customer | null): void {
    this.value = value;
    this.selectedCustomer = value;
    this.customerName = value?.name || '';
    this.customerId = value?.id || '';
  }

  registerOnChange(fn: (value: Customer | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
