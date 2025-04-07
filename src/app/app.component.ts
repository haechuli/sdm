
import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BodyComponent } from '../layout/body/body.component';
import { SidenavComponent } from '../layout/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SidenavComponent,
            BodyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent {
  title = 'sdm';
  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    console.log('data', data);

     this.screenWidth = data.screenWidth;
     this.isSideNavCollapsed = data.collapsed;
  }
}
