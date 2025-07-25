import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() icon: string = '';
  @Input() collapsible: boolean = false;
  @Input() collapsed: boolean = false;
  @Input() headerBackground: 'primary' | 'secondary' | 'light' | 'dark' = 'light';
  @Input() padding: 'none' | 'small' | 'medium' | 'large' = 'medium';
  @Input() border: boolean = true;
  @Input() shadow: boolean = false;
  @Input() rounded: boolean = true;
  @Input() width: string = '100%';
  @Input() height: string = 'auto';
  @Input() minHeight: string = '';
  @Input() maxHeight: string = '';

  // 내부 상태
  isCollapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.isCollapsed = this.collapsed;
  }

  toggleCollapse(): void {
    if (this.collapsible) {
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
