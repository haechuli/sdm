import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() message: string = '로딩 중...';
  @Input() type: 'spinner' | 'dots' | 'pulse' | 'bars' = 'spinner';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() overlay: boolean = true;
  @Input() transparent: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
}
