import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui-component/button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  run() {
    alert('실행 버튼 클릭!');
  }

}
