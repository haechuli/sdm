import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Language {
  code: string;
  name: string;
  flag: string;
  dateFormat: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('ko');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private readonly languages: Language[] = [
    { code: 'ko', name: '한국어', flag: 'https://flagcdn.com/w20/kr.png', dateFormat: 'YYYY-MM-DD' },
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w20/us.png', dateFormat: 'MM/DD/YYYY' },
    { code: 'id', name: 'Indonesia', flag: 'https://flagcdn.com/w20/id.png', dateFormat: 'DD/MM/YYYY' },
  ];

  private translations: { [key: string]: { [key: string]: string } } = {
    ko: {
      'admin_system': '관리자 시스템',
      'execute': '실행',
      'user_name': '홍길동',
      'dashboard': '대시보드',
      'loan': '대출',
      'credit_limit': '한도',
      'disburse': '실행',
      'approvals': '승인',
      'project': '프로젝트',
      'merge_request': '병합 요청',
      'settings': '설정',
      'login': '로그인',
      'user_id': '사용자 ID',
      'password': '비밀번호',
      'welcome': '환영합니다',
      'financial_system': '금융 관리 시스템',
      'login_description': '안전하고 효율적인 금융 솔루션',
      'enter_user_id': '사용자 ID를 입력하세요',
      'enter_password': '비밀번호를 입력하세요',
      'login_failed': '로그인에 실패했습니다. 다시 시도해주세요.',
      'invalid_credentials': '잘못된 사용자 정보입니다.',
      'logout': '로그아웃',
      'branch': '지점',
      'select_branch': '지점을 선택하세요',
      'trading_date': '거래일자',
      'select_date': '날짜를 선택하세요',
      'date_selection': '날짜 선택',
      'current_time': '현재시간',
      'system_online': '시스템 정상',
      'customer_search': '고객 검색',
      'customer_id': '고객번호',
      'customer_name': '고객명',
      'search': '검색',
      'select_customer': '고객을 선택하세요',
      'customer_list': '고객 목록',
      'select': '선택',
      'close': '닫기',
      'no_customers_found': '검색된 고객이 없습니다',
      'enter_customer_id': '고객번호를 입력하세요'
    },
    en: {
      'admin_system': 'Admin System',
      'execute': 'Execute',
      'user_name': 'Hong Gil-dong',
      'dashboard': 'Dashboard',
      'loan': 'Loan',
      'credit_limit': 'Credit Limit',
      'disburse': 'Disburse',
      'approvals': 'Approvals',
      'project': 'Project',
      'merge_request': 'Merge Request',
      'settings': 'Settings',
      'login': 'Login',
      'user_id': 'User ID',
      'password': 'Password',
      'welcome': 'Welcome',
      'financial_system': 'Financial Management System',
      'login_description': 'Safe and efficient financial solution',
      'enter_user_id': 'Enter your User ID',
      'enter_password': 'Enter your Password',
      'login_failed': 'Login failed. Please try again.',
      'invalid_credentials': 'Invalid user credentials.',
      'logout': 'Logout',
      'branch': 'Branch',
      'select_branch': 'Select Branch',
      'trading_date': 'Trading Date',
      'select_date': 'Please select a date',
      'date_selection': 'Date Selection',
      'current_time': 'Current Time',
      'system_online': 'System Online',
      'customer_search': 'Customer Search',
      'customer_id': 'Customer ID',
      'customer_name': 'Customer Name',
      'search': 'Search',
      'select_customer': 'Select Customer',
      'customer_list': 'Customer List',
      'select': 'Select',
      'close': 'Close',
      'no_customers_found': 'No customers found',
      'enter_customer_id': 'Enter Customer ID'
    },
    id: {
      'admin_system': 'Admin System',
      'execute': 'Execute',
      'user_name': 'Hong Gil-dong',
      'dashboard': 'Dashboard',
      'loan': 'Loan',
      'credit_limit': 'Credit Limit',
      'disburse': 'Disburse',
      'approvals': 'Approvals',
      'project': 'Project',
      'merge_request': 'Merge Request',
      'settings': 'Settings',
      'login': 'Masuk',
      'user_id': 'ID Pengguna',
      'password': 'Kata Sandi',
      'welcome': 'Selamat Datang',
      'financial_system': 'Sistem Manajemen Keuangan',
      'login_description': 'Solusi keuangan yang aman dan efisien',
      'enter_user_id': 'Masukkan ID Pengguna Anda',
      'enter_password': 'Masukkan Kata Sandi Anda',
      'login_failed': 'Login gagal. Silakan coba lagi.',
      'invalid_credentials': 'Kredensial pengguna tidak valid.',
      'logout': 'Keluar',
      'branch': 'Cabang',
      'select_branch': 'Pilih Cabang',
      'trading_date': 'Tanggal Transaksi',
      'select_date': 'Silakan pilih tanggal',
      'date_selection': 'Pemilihan Tanggal',
      'current_time': 'Waktu Saat Ini',
      'system_online': 'Sistem Online',
      'customer_search': 'Pencarian Pelanggan',
      'customer_id': 'ID Pelanggan',
      'customer_name': 'Nama Pelanggan',
      'search': 'Cari',
      'select_customer': 'Pilih Pelanggan',
      'customer_list': 'Daftar Pelanggan',
      'select': 'Pilih',
      'close': 'Tutup',
      'no_customers_found': 'Tidak ada pelanggan ditemukan',
      'enter_customer_id': 'Masukkan ID Pelanggan'
    },
  };

  constructor() {
    // 로컬 스토리지에서 저장된 언어 설정 불러오기
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && this.isValidLanguage(savedLanguage)) {
      this.currentLanguageSubject.next(savedLanguage);
    }
  }

  getLanguages(): Language[] {
    return this.languages;
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  setLanguage(languageCode: string): void {
    if (this.isValidLanguage(languageCode)) {
      this.currentLanguageSubject.next(languageCode);
      localStorage.setItem('selectedLanguage', languageCode);
    }
  }

  translate(key: string): string {
    const currentLang = this.getCurrentLanguage();
    return this.translations[currentLang]?.[key] || key;
  }

  private isValidLanguage(code: string): boolean {
    return this.languages.some(lang => lang.code === code);
  }
}
