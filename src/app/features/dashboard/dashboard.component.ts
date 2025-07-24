import { Component ,OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { InputComponent } from '../../shared/ui-component/input/input.component';
import { ComboBoxComponent } from '../../shared/ui-component/combobox/combobox.component';
import { NumberInputComponent } from '../../shared/ui-component/number-input/number-input.component';
import { ButtonComponent } from '../../shared/ui-component/button/button.component';
import { DatepickerComponent } from '../../shared/ui-component/datepicker/datepicker.component';
import { CustomerSearchComponent, Customer } from '../../shared/ui-component/customer-search/customer-search.component';
import { GridComponent } from '../../shared/ui-component/grid/grid.component';
import { GridColumn, GridRow } from '../../shared/ui-component/grid/grid.model';
import { CustomDateFormatPipe } from '../../shared/pipes/custom-date-format.pipe';
import { MaskInputComponent } from '../../shared/ui-component/mask-input/mask-input.component';
import { PageTitleComponent } from '../../shared/ui-component/page-title/page-title.component';
import { FileUploadComponent } from '../../shared/ui-component/file-upload/file-upload.component';
import { FileUploadItem } from '../../shared/ui-component/file-upload/file-upload.component';
import { ImageViewerComponent, ImageViewerImage, ImageViewerConfig } from '../../shared/ui-component/image-viewer/image-viewer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,
            ReactiveFormsModule,
            InputComponent,
            ComboBoxComponent,
            NumberInputComponent,
            ButtonComponent,
            DatepickerComponent,
            CustomerSearchComponent,
            GridComponent,
            MaskInputComponent,
            PageTitleComponent,
            FileUploadComponent,
            ImageViewerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {


  amount = 123456789;
  amount2 = 123456789;
  fb = inject(FormBuilder);

  form = this.fb.group({
    country: [''],
    email:[''],
    numberInput:[''],
    numberInput2:[''],
    button1:[''],
    button2:[''],
    customer:[''],
    phone:[''],
    documents:[''],
    profileImage:[''],
  });

  countries = [
      { label: 'South Korea', value: 'kr' },
      { label: 'USA', value: 'us' },
      { label: 'Japan', value: 'jp' }
    ];

  selectedDate: Date = new Date();

  // 그리드 설정
  gridColumns: GridColumn[] = [
    { field: 'id', header: 'ID', width: '80px', type: 'number' },
    { field: 'name', header: '고객명', width: '150px', type: 'text' },
    { field: 'phone', header: '전화번호', width: '130px', type: 'text' },
    { field: 'email', header: '이메일', width: '200px', type: 'text' },
    { field: 'address', header: '주소', width: '250px', type: 'text' },
    { field: 'company', header: '회사', width: '180px', type: 'text' },
    { field: 'department', header: '부서', width: '120px', type: 'text' },
    { field: 'position', header: '직급', width: '100px', type: 'text' },
    { field: 'amount', header: '금액', width: '120px', type: 'number' },
    { field: 'status', header: '상태', width: '100px', type: 'status' },
    { field: 'date', header: '등록일', width: '120px', type: 'date' },
    { field: 'lastLogin', header: '최종로그인', width: '140px', type: 'date' },
    { field: 'score', header: '점수', width: '80px', type: 'number' },
    { field: 'notes', header: '비고', width: '200px', type: 'text' }
  ];

  gridData: GridRow[] = [
    {
      id: 1,
      name: '김철수',
      phone: '010-1234-5678',
      email: 'kim@example.com',
      address: '서울시 강남구 테헤란로 123',
      company: '(주)테크놀로지',
      department: '개발팀',
      position: '팀장',
      amount: 1500000,
      status: 'active',
      date: '2024-01-15',
      lastLogin: '2024-03-10',
      score: 95,
      notes: '우수 고객'
    },
    {
      id: 2,
      name: '이영희',
      phone: '010-2345-6789',
      email: 'lee@example.com',
      address: '서울시 서초구 서초대로 456',
      company: '삼성전자',
      department: '마케팅팀',
      position: '과장',
      amount: 2300000,
      status: 'inactive',
      date: '2024-01-20',
      lastLogin: '2024-02-15',
      score: 87,
      notes: '장기 고객'
    },
    {
      id: 3,
      name: '박민수',
      phone: '010-3456-7890',
      email: 'park@example.com',
      address: '서울시 송파구 올림픽로 789',
      company: 'LG전자',
      department: '영업팀',
      position: '대리',
      amount: 850000,
      status: 'pending',
      date: '2024-02-01',
      lastLogin: '2024-03-05',
      score: 72,
      notes: '신규 고객'
    },
    {
      id: 4,
      name: '정수진',
      phone: '010-4567-8901',
      email: 'jung@example.com',
      address: '서울시 마포구 월드컵북로 321',
      company: '네이버',
      department: 'IT팀',
      position: '선임',
      amount: 3200000,
      status: 'active',
      date: '2024-02-10',
      lastLogin: '2024-03-12',
      score: 98,
      notes: 'VIP 고객'
    },
    {
      id: 5,
      name: '최동훈',
      phone: '010-5678-9012',
      email: 'choi@example.com',
      address: '서울시 용산구 한강대로 654',
      company: '카카오',
      department: '기획팀',
      position: '차장',
      amount: 1200000,
      status: 'inactive',
      date: '2024-02-15',
      lastLogin: '2024-01-30',
      score: 65,
      notes: '휴면 고객'
    }
  ];

  // 이미지 뷰어 설정
  imageViewerVisible = false;
  imageViewerImages: ImageViewerImage[] = [
    {
      src: 'https://picsum.photos/800/600?random=1',
      alt: '샘플 이미지 1',
      title: '자연 풍경',
      description: '아름다운 자연 풍경 사진입니다.'
    },
    {
      src: 'https://picsum.photos/800/600?random=2',
      alt: '샘플 이미지 2',
      title: '도시 전경',
      description: '현대적인 도시의 모습을 담은 사진입니다.'
    },
    {
      src: 'https://picsum.photos/800/600?random=3',
      alt: '샘플 이미지 3',
      title: '건축물',
      description: '독특한 건축 양식의 건물 사진입니다.'
    },
    {
      src: 'https://picsum.photos/800/600?random=4',
      alt: '샘플 이미지 4',
      title: '음식',
      description: '맛있어 보이는 음식 사진입니다.'
    },
    {
      src: 'https://picsum.photos/800/600?random=5',
      alt: '샘플 이미지 5',
      title: '동물',
      description: '귀여운 동물 사진입니다.'
    }
  ];
  
  imageViewerCurrentIndex = 0;
  imageViewerConfig: ImageViewerConfig = {
    allowZoom: true,
    allowRotation: true,
    allowFullscreen: true,
    showThumbnails: true,
    showControls: true,
    enableKeyboard: true,
    maxZoom: 3,
    minZoom: 0.2,
    zoomStep: 0.2,
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  };

  ngOnInit(): void {



  }

  onCountryChanged(event : Event) {

  }

  onSave() {
    console.log('저장되었습니다.');
    this.form.controls.numberInput.setValue("22222222222222");
 }

  onDelete() {
    console.log('삭제되었습니다.');
  }

  onCustomerSelected(customer: Customer) {
    console.log('선택된 고객:', customer);
  }

  onCustomerSearchRequested(searchTerm: string) {
    console.log('검색 요청:', searchTerm);
  }

  // 그리드 이벤트 핸들러
  onGridRowClick(row: GridRow) {
    console.log('행 클릭:', row);
  }

  onGridRowDoubleClick(row: GridRow) {
    console.log('행 더블클릭:', row);
  }

  onGridSelectionChange(selectedRows: GridRow[]) {
    console.log('선택된 행들:', selectedRows);
  }

  // 파일 업로드 이벤트 핸들러
  onFilesSelected(files: FileUploadItem[]) {
    console.log('선택된 파일들:', files);
    // 파일 선택 시 필요한 로직 추가
    if (files.length > 0) {
      console.log(`${files.length}개의 파일이 선택되었습니다.`);
      files.forEach(file => {
        console.log(`- ${file.name} (${this.formatFileSize(file.size)})`);
      });
    }
  }

  onUploadComplete(fileItem: FileUploadItem) {
    console.log('업로드 완료:', fileItem);
    // 업로드 완료 시 필요한 로직 추가
    alert(`파일 업로드가 완료되었습니다: ${fileItem.name}`);
  }

  onImageSelected(files: FileUploadItem[]) {
    console.log('선택된 이미지:', files);
    // 이미지 선택 시 필요한 로직 추가
    if (files.length > 0) {
      const imageFile = files[0];
      console.log(`이미지 파일: ${imageFile.name} (${this.formatFileSize(imageFile.size)})`);

      // 이미지 미리보기 등의 로직을 여기에 추가할 수 있습니다
      if (imageFile.file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          console.log('이미지 미리보기 URL:', e.target?.result);
        };
        reader.readAsDataURL(imageFile.file);
      }
    }
  }

  // 파일 크기 포맷팅 유틸리티 메서드
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // 이미지 뷰어 관련 메서드
  openImageViewer(index: number = 0) {
    this.imageViewerCurrentIndex = index;
    this.imageViewerVisible = true;
  }

  closeImageViewer() {
    this.imageViewerVisible = false;
  }

  onImageViewerIndexChange(index: number) {
    this.imageViewerCurrentIndex = index;
  }

  onImageLoad(image: ImageViewerImage) {
    console.log('이미지 로드 완료:', image);
  }

  onImageError(error: string) {
    console.error('이미지 로드 에러:', error);
    alert('이미지를 불러올 수 없습니다.');
  }

  // 샘플 이미지 추가 메서드
  addSampleImage() {
    const randomId = Math.floor(Math.random() * 1000) + 6;
    const newImage: ImageViewerImage = {
      src: `https://picsum.photos/800/600?random=${randomId}`,
      alt: `샘플 이미지 ${this.imageViewerImages.length + 1}`,
      title: `새로운 이미지 ${this.imageViewerImages.length + 1}`,
      description: '새로 추가된 샘플 이미지입니다.'
    };
    this.imageViewerImages.push(newImage);
  }

  // 이미지 목록 초기화
  resetImageList() {
    this.imageViewerImages = [
      {
        src: 'https://picsum.photos/800/600?random=1',
        alt: '샘플 이미지 1',
        title: '자연 풍경',
        description: '아름다운 자연 풍경 사진입니다.'
      },
      {
        src: 'https://picsum.photos/800/600?random=2',
        alt: '샘플 이미지 2',
        title: '도시 전경',
        description: '현대적인 도시의 모습을 담은 사진입니다.'
      },
      {
        src: 'https://picsum.photos/800/600?random=3',
        alt: '샘플 이미지 3',
        title: '건축물',
        description: '독특한 건축 양식의 건물 사진입니다.'
      }
    ];
    this.imageViewerCurrentIndex = 0;
  }
}
