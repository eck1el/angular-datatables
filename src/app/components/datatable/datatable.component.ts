import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.css'
})
export class DatatableComponent {
  public dtoptions:DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();
  data:any[]=[];
  constructor(private http:HttpClient){

  }
  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      searching:true,
      paging:true,
      lengthChange:false,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/2.0.3/i18n/es-ES.json',
      }
    }
    this.http.get('https://corrugadoras.eck1el-fullstack.com/proyectoLatamApi/employee.json')
    .subscribe((res:any) => {
      this.data = res.data;
      this.dtTrigger.next(null);
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
