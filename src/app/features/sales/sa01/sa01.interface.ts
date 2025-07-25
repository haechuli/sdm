export interface DealerSearchCriteria {
  brNo: string;
  name: string;
  status: string;
  fullName: string;
  dlrKndCd: string;
  bankAccountName: string;
  npwp: string;
  address: string;
}

export interface DealerInfo {
  dealerId: string;
  name: string;
  dlrKndCd: string;
  dlrKndNm: string;
  address1: string;
  address2: string;
  city: string;
  postalCode: string;
  telephone: string;
  fax: string;
  email: string;
  status: string;
  statusNm: string;
  brNo: string;
}

export interface DealerDetail {
  seq: string;
  dealerId: string;
  fullName: string;
  nickName: string;
  idNo: string;
  birthDt: string;
  contactTelephone: string;
  contactEmail: string;
  contactMobile: string;
  dealerDvCd: string;
  dealerDvNm: string;
  corporateTax: string;
  corporateTaxNm: string;
  npwp: string;
  bankAccountName: string;
  bankCd: string;
  bankNm: string;
  accountNo: string;
}

export interface ComboOption {
  code: string;
  codeNm: string;
}
