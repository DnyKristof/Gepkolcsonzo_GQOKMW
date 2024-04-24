import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Rental } from '../../models/rental.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rentals',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,DatePipe],
  templateUrl: './rentals.component.html',
  styleUrl: './rentals.component.css'
})
export class RentalsComponent implements AfterViewInit{

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  generateIndex(): string {
    const randomNumber = Math.floor(Math.random() * 1000000);
    return randomNumber.toString().padStart(6, '0');
  }

   formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}/${month}/${day} : ${hours}/${minutes}`;
  }

  



  displayedColumns: string[] = ['_id','start_date', 'end_date', 'machine_id', 'return_condition'];
  dataSource: MatTableDataSource<Rental> = new MatTableDataSource<Rental>();

  rentals: Rental[] = [];

  ngAfterViewInit() {
    this.dataSource.data = this.rentals
    this.dataSource.paginator = this.paginator;
  }
}
