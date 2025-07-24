import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ImageViewerImage {
  src: string;
  alt?: string;
  title?: string;
  description?: string;
}

export interface ImageViewerConfig {
  allowZoom?: boolean;
  allowRotation?: boolean;
  allowFullscreen?: boolean;
  showThumbnails?: boolean;
  showControls?: boolean;
  enableKeyboard?: boolean;
  maxZoom?: number;
  minZoom?: number;
  zoomStep?: number;
  backgroundColor?: string;
}

@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit, OnDestroy {
  @Input() images: ImageViewerImage[] = [];
  @Input() currentIndex: number = 0;
  @Input() isVisible: boolean = false;
  @Input() config: ImageViewerConfig = {};
  
  @Output() close = new EventEmitter<void>();
  @Output() indexChange = new EventEmitter<number>();
  @Output() imageLoad = new EventEmitter<ImageViewerImage>();
  @Output() imageError = new EventEmitter<string>();

  @ViewChild('imageContainer', { static: false }) imageContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('currentImageRef', { static: false }) currentImageRef!: ElementRef<HTMLImageElement>;

  // Default configuration
  defaultConfig: ImageViewerConfig = {
    allowZoom: true,
    allowRotation: true,
    allowFullscreen: true,
    showThumbnails: true,
    showControls: true,
    enableKeyboard: true,
    maxZoom: 5,
    minZoom: 0.1,
    zoomStep: 0.1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  };

  // Image transform states
  zoom: number = 1;
  rotation: number = 0;
  translateX: number = 0;
  translateY: number = 0;

  // UI states
  isLoading: boolean = false;
  isFullscreen: boolean = false;
  isDragging: boolean = false;
  showInfo: boolean = false;

  // Mouse/touch states
  private lastPinchDistance: number = 0;
  private dragStart: { x: number; y: number } = { x: 0, y: 0 };

  constructor() {}

  ngOnInit(): void {
    this.config = { ...this.defaultConfig, ...this.config };
    console.log("시작");
    if (this.images.length > 0 && this.currentIndex >= 0 && this.currentIndex < this.images.length) {
      console.log(this.images.length);
       console.log("this.currentIndex");
       console.log(this.currentIndex);
       
      this.loadImage(this.currentIndex);
    }
  }

  ngOnDestroy(): void {
    this.removeEventListeners();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.isVisible || !this.config.enableKeyboard) return;

    switch (event.key) {
      case 'Escape':
        this.closeViewer();
        break;
      case 'ArrowLeft':
        this.previousImage();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
      case '+':
      case '=':
        this.zoomIn();
        break;
      case '-':
        this.zoomOut();
        break;
      case '0':
        this.resetTransform();
        break;
      case 'r':
      case 'R':
        this.rotateImage();
        break;
      case 'f':
      case 'F':
        this.toggleFullscreen();
        break;
      case 'i':
      case 'I':
        this.toggleInfo();
        break;
    }
  }

  @HostListener('document:fullscreenchange', ['$event'])
  onFullscreenChange(): void {
    this.isFullscreen = !!document.fullscreenElement;
  }

  loadImage(index: number): void {
    if (index < 0 || index >= this.images.length) return;

    this.isLoading = true;
    this.currentIndex = index;
    this.resetTransform();
    this.indexChange.emit(this.currentIndex);
  }

  onImageLoad(): void {
    this.isLoading = false;
    this.imageLoad.emit(this.images[this.currentIndex]);
  }

  onImageError(): void {
    this.isLoading = false;
    this.imageError.emit(`Failed to load image: ${this.images[this.currentIndex]?.src}`);
  }

  closeViewer(): void {
    this.isVisible = false;
    this.resetTransform();
    this.close.emit();
  }

  previousImage(): void {
    if (this.images.length <= 1) return;
    const newIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
    this.loadImage(newIndex);
  }

  nextImage(): void {
    if (this.images.length <= 1) return;
    const newIndex = this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
    this.loadImage(newIndex);
  }

  zoomIn(): void {
    if (!this.config.allowZoom) return;
    const newZoom = Math.min(this.zoom + (this.config.zoomStep || 0.1), this.config.maxZoom || 5);
    this.setZoom(newZoom);
  }

  zoomOut(): void {
    if (!this.config.allowZoom) return;
    const newZoom = Math.max(this.zoom - (this.config.zoomStep || 0.1), this.config.minZoom || 0.1);
    this.setZoom(newZoom);
  }

  setZoom(zoom: number): void {
    this.zoom = zoom;
    this.updateTransform();
  }

  rotateImage(): void {
    if (!this.config.allowRotation) return;
    this.rotation = (this.rotation + 90) % 360;
    this.updateTransform();
  }

  resetTransform(): void {
    this.zoom = 1;
    this.rotation = 0;
    this.translateX = 0;
    this.translateY = 0;
    this.updateTransform();
  }

  fitToScreen(): void {
    this.zoom = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.updateTransform();
  }

  toggleFullscreen(): void {
    if (!this.config.allowFullscreen) return;

    if (!this.isFullscreen) {
      const element = this.imageContainer?.nativeElement?.parentElement;
      if (element) {
        element.requestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
  }

  toggleInfo(): void {
    this.showInfo = !this.showInfo;
  }

  onThumbnailClick(index: number): void {
    this.loadImage(index);
  }

  onWheelZoom(event: WheelEvent): void {
    if (!this.config.allowZoom) return;
    
    event.preventDefault();
    const delta = event.deltaY > 0 ? -1 : 1;
    const newZoom = Math.max(
      this.config.minZoom || 0.1,
      Math.min(this.config.maxZoom || 5, this.zoom + delta * (this.config.zoomStep || 0.1))
    );
    this.setZoom(newZoom);
  }

  onMouseDown(event: MouseEvent): void {
    if (event.button !== 0) return; // Only left mouse button
    
    this.isDragging = true;
    this.dragStart = { x: event.clientX - this.translateX, y: event.clientY - this.translateY };
    event.preventDefault();
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    
    this.translateX = event.clientX - this.dragStart.x;
    this.translateY = event.clientY - this.dragStart.y;
    this.updateTransform();
  }

  onMouseUp(): void {
    this.isDragging = false;
  }

  onTouchStart(event: TouchEvent): void {
    if (event.touches.length === 1) {
      // Single touch - start dragging
      const touch = event.touches[0];
      this.isDragging = true;
      this.dragStart = { x: touch.clientX - this.translateX, y: touch.clientY - this.translateY };
    } else if (event.touches.length === 2) {
      // Two touches - start pinch zoom
      this.isDragging = false;
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      this.lastPinchDistance = this.getTouchDistance(touch1, touch2);
    }
    event.preventDefault();
  }

  onTouchMove(event: TouchEvent): void {
    if (event.touches.length === 1 && this.isDragging) {
      // Single touch - dragging
      const touch = event.touches[0];
      this.translateX = touch.clientX - this.dragStart.x;
      this.translateY = touch.clientY - this.dragStart.y;
      this.updateTransform();
    } else if (event.touches.length === 2 && this.config.allowZoom) {
      // Two touches - pinch zoom
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      const currentDistance = this.getTouchDistance(touch1, touch2);
      
      if (this.lastPinchDistance > 0) {
        const scale = currentDistance / this.lastPinchDistance;
        const newZoom = Math.max(
          this.config.minZoom || 0.1,
          Math.min(this.config.maxZoom || 5, this.zoom * scale)
        );
        this.setZoom(newZoom);
      }
      
      this.lastPinchDistance = currentDistance;
    }
    event.preventDefault();
  }

  onTouchEnd(): void {
    this.isDragging = false;
    this.lastPinchDistance = 0;
  }

  private getTouchDistance(touch1: Touch, touch2: Touch): number {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private updateTransform(): void {
    if (this.currentImageRef?.nativeElement) {
      const transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.zoom}) rotate(${this.rotation}deg)`;
      this.currentImageRef.nativeElement.style.transform = transform;
    }
  }

  private removeEventListeners(): void {
    // Clean up any remaining event listeners if needed
  }

  get currentImage(): ImageViewerImage | null {
    console.log(this.images[this.currentIndex] || null);
    
    return this.images[this.currentIndex] || null;
  }

  get hasMultipleImages(): boolean {
    return this.images.length > 1;
  }

  get canGoPrevious(): boolean {
    return this.hasMultipleImages;
  }

  get canGoNext(): boolean {
    return this.hasMultipleImages;
  }
}
