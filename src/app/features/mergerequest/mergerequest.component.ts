import { Component,ViewChild,TemplateRef } from '@angular/core';
import { GridComponent } from '../../shared/ui-component/grid/grid.component'
import { GridColumn } from '../../shared/ui-component/grid/grid.model'  

@Component({
  selector: 'app-mergerequest',
  standalone: true,
  imports: [GridComponent],
  templateUrl: './mergerequest.component.html',
  styleUrl: './mergerequest.component.scss'
})
export class MergerequestComponent {

   @ViewChild('action', { static: true }) actionTemplate!: TemplateRef<any>;
  columns: GridColumn[] = [];

  // 샘플 Grid 데이터 생성
  rows = Array.from({ length: 15 }).map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@mail.com`
  }));

  ngOnInit() {
    this.columns = [
      { field: 'id', header: 'ID', width: '80px' },
      { field: 'name', header: 'Name', width: '200px' },
      { field: 'email', header: 'Email', width: '100px' },
      { field: 'action', header: 'Action', templateRef: this.actionTemplate }
    ];
  }

  onSelected(selected: any[]) {
    console.log('Selected rows:', selected);
  }

  doSomething(row: any) {
    alert(`Action for ${row.name}`);
  }

}
