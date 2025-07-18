import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface FileUploadItem {
  file: File;
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  url?: string;
}

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input() label: string = '파일 업로드';
  @Input() multiple: boolean = true;
  @Input() acceptedTypes: string = '*/*'; // 'image/*', '.pdf,.doc,.docx', etc.
  @Input() maxFileSize: number = 10 * 1024 * 1024; // 10MB
  @Input() maxFiles: number = 5;
  @Input() width: string = '100%';
  @Input() height: string = '200px';
  @Input() disabled: boolean = false;
  @Input() showPreview: boolean = true;
  @Input() uploadUrl: string = '';
  @Input() autoUpload: boolean = false;

  @Output() filesSelected = new EventEmitter<FileUploadItem[]>();
  @Output() fileRemoved = new EventEmitter<FileUploadItem>();
  @Output() uploadComplete = new EventEmitter<FileUploadItem>();
  @Output() uploadError = new EventEmitter<{file: FileUploadItem, error: string}>();

  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef<HTMLInputElement>;

  files: FileUploadItem[] = [];
  isDragOver = false;

  private onChange = (value: FileUploadItem[]) => {};
  private onTouched = () => {};

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.handleFiles(Array.from(target.files));
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    if (event.dataTransfer?.files) {
      this.handleFiles(Array.from(event.dataTransfer.files));
    }
  }

  private handleFiles(newFiles: File[]): void {
    const validFiles: FileUploadItem[] = [];

    for (const file of newFiles) {
      // 파일 개수 제한 확인
      if (this.files.length + validFiles.length >= this.maxFiles) {
        alert(`최대 ${this.maxFiles}개의 파일만 업로드할 수 있습니다.`);
        break;
      }

      // 파일 크기 확인
      if (file.size > this.maxFileSize) {
        alert(`파일 크기는 ${this.formatFileSize(this.maxFileSize)}를 초과할 수 없습니다.`);
        continue;
      }

      // 파일 타입 확인
      if (!this.isValidFileType(file)) {
        alert(`허용되지 않는 파일 형식입니다: ${file.name}`);
        continue;
      }

      // 중복 파일 확인
      if (this.files.some(f => f.name === file.name && f.size === file.size)) {
        alert(`이미 추가된 파일입니다: ${file.name}`);
        continue;
      }

      const fileItem: FileUploadItem = {
        file,
        id: this.generateId(),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'pending'
      };

      validFiles.push(fileItem);
    }

    this.files = [...this.files, ...validFiles];
    this.filesSelected.emit(this.files);
    this.onChange(this.files);
    this.onTouched();

    // 자동 업로드가 활성화된 경우
    if (this.autoUpload && this.uploadUrl) {
      validFiles.forEach(file => this.uploadFile(file));
    }

    // 파일 입력 초기화
    this.fileInput.nativeElement.value = '';
  }

  private isValidFileType(file: File): boolean {
    if (this.acceptedTypes === '*/*') return true;

    const types = this.acceptedTypes.split(',').map(t => t.trim());
    return types.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      } else if (type.includes('*')) {
        const mainType = type.split('/')[0];
        return file.type.startsWith(mainType);
      } else {
        return file.type === type;
      }
    });
  }

  removeFile(fileItem: FileUploadItem): void {
    this.files = this.files.filter(f => f.id !== fileItem.id);
    this.fileRemoved.emit(fileItem);
    this.onChange(this.files);
  }

  clearAll(): void {
    this.files = [];
    this.onChange(this.files);
    this.fileInput.nativeElement.value = '';
  }

  uploadFile(fileItem: FileUploadItem): void {
    if (!this.uploadUrl) {
      console.error('Upload URL not provided');
      return;
    }

    const formData = new FormData();
    formData.append('file', fileItem.file);

    fileItem.status = 'uploading';

    // 실제 HTTP 요청 대신 시뮬레이션
    this.simulateUpload(fileItem);
  }

  private simulateUpload(fileItem: FileUploadItem): void {
    // 실제 구현에서는 HttpClient를 사용하여 파일 업로드
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      fileItem.progress = Math.min(progress, 100);

      if (fileItem.progress >= 100) {
        clearInterval(interval);
        fileItem.status = 'success';
        fileItem.url = 'https://example.com/uploaded-file'; // 실제 URL
        this.uploadComplete.emit(fileItem);
      }
    }, 200);
  }

  uploadAll(): void {
    if (!this.uploadUrl) {
      console.error('Upload URL not provided');
      return;
    }

    this.files
      .filter(f => f.status === 'pending')
      .forEach(f => this.uploadFile(f));
  }

  openFileDialog(): void {
    if (!this.disabled) {
      this.fileInput.nativeElement.click();
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  isImage(file: FileUploadItem): boolean {
    return file.type.startsWith('image/');
  }

  getFileIcon(file: FileUploadItem): string {
    if (file.type.startsWith('image/')) return 'fas fa-image';
    if (file.type.includes('pdf')) return 'fas fa-file-pdf';
    if (file.type.includes('word')) return 'fas fa-file-word';
    if (file.type.includes('excel')) return 'fas fa-file-excel';
    if (file.type.includes('zip')) return 'fas fa-file-archive';
    return 'fas fa-file';
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // TrackBy 함수 추가
  trackByFileId(index: number, file: FileUploadItem): string {
    return file.id;
  }

  // 이미지 미리보기 URL 생성
  getImagePreview(file: FileUploadItem): string {
    if (file.file && this.isImage(file)) {
      return URL.createObjectURL(file.file);
    }
    return '';
  }

  // 모든 파일이 pending 상태가 아닌지 확인
  get allFilesUploaded(): boolean {
    return this.files.every(f => f.status !== 'pending');
  }

  // ControlValueAccessor 구현
  writeValue(value: FileUploadItem[]): void {
    this.files = value || [];
  }

  registerOnChange(fn: (value: FileUploadItem[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
