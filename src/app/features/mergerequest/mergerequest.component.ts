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
  selectedcontents: any[] = []; 
  // 샘플 Grid 데이터 생성
  rows = Array.from({ length: 15 }).map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@mail.com`,
    hp: `010-3434-434 (${i + 1})`,
    address: `gdfgfddddddddddddddddddddddddgdfggf (${i + 1})`,
  }));

  ngOnInit() {
    this.columns = [
      { field: 'id', header: 'ID', width: '80px', visible: true },
      { field: 'name', header: 'Name', width: '200px', visible: false  },
      { field: 'email', header: 'Email', width: '200px', visible: true  },
      { field: 'hp', header: 'Hp', width: '200px', visible: true  },
      { field: 'address', header: 'Address', width: '600px', visible: true  },
      { field: 'action', header: 'Action', width: '200px', visible: true , templateRef: this.actionTemplate }
    ];
  }

  onSelected(selected: any[]) {
    console.log('Selected rows:', selected);
    this.selectedcontents = selected;
  }

  doSomething(row: any) {
    alert(`Action for ${row.name}`);
  }

}
