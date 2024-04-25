import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Machine } from '../../models/machine.model';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-machines',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.css'
})
export class MachinesComponent implements AfterViewInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;


  generateIndex(): string {
    const randomNumber = Math.floor(Math.random() * 1000000);
    return randomNumber.toString().padStart(6, '0');
  }


  displayedColumns: string[] = ['_id', 'brand', 'name', 'type', 'power', 'weight', 'deposit', 'lease'];
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
