import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageViewerComponent,ImageViewerImage, ImageViewerConfig } from '../../../shared/ui-component/image-viewer/image-viewer.component';
import { ButtonComponent } from '../../../shared/ui-component/button/button.component';

@Component({
  selector: 'app-credit-limit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ImageViewerComponent,ButtonComponent],
  templateUrl: './credit-limit.component.html',
  styleUrl: './credit-limit.component.scss'
})
export class CreditLimitComponent {

  
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
