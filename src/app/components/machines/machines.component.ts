import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Machine } from '../../models/machine.model';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-machines',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,RouterModule],
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.css'
})
export class MachinesComponent implements AfterViewInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['_id', 'brand', 'name', 'type', 'power', 'weight', 'deposit', 'lease','company'];
  dataSource: MatTableDataSource<Machine> = new MatTableDataSource<Machine>();



  machines: Machine[] = [];


  constructor(private http: HttpClient) { }

  ngAfterViewInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<Machine[]>('http://localhost:3000/machine')
      .subscribe(data => {
        this.machines = data;
        this.dataSource.data = this.machines;
        this.dataSource.paginator = this.paginator;
        console.log(this.machines);
      });
  }

}
