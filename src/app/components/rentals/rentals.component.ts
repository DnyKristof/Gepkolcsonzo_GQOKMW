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

  



  displayedColumns: string[] = ['id','start_date', 'end_date', 'machine_id', 'return_condition'];
  dataSource: MatTableDataSource<Rental> = new MatTableDataSource<Rental>();

  rentals: Rental[] = [
    {
      id: this.generateIndex(),
      start_date: new Date('2024-04-01'),
      end_date: new Date('2024-04-10'),
      machine_id: this.generateIndex(),
      return_condition: true
    },
    {
      id: this.generateIndex(),
      start_date: new Date('2024-04-05'),
      end_date: new Date('2024-04-15'),
      machine_id: this.generateIndex(),
      return_condition: false
    },
    {
      id: this.generateIndex(),
      start_date: new Date('2024-04-10'),
      end_date: new Date('2024-04-20'),
      machine_id: this.generateIndex(),
      return_condition: true
    },
    {
      id: this.generateIndex(),
      start_date: new Date('2024-04-15'),
      end_date: new Date('2024-04-25'),
      machine_id: this.generateIndex(),
      return_condition: false
    },
    {
      id: this.generateIndex(),
      start_date: new Date('2024-04-20'),
      end_date: new Date('2024-04-30'),
      machine_id: this.generateIndex(),
      return_condition: true
    },
    {
      id: this.generateIndex(),
      start_date: new Date('2024-04-25'),
      end_date: new Date('2024-05-05'),
      machine_id: this.generateIndex(),
      return_condition: false
    },
    {
      id: this.generateIndex(),
      start_date: new Date('2024-05-01'),
      end_date: new Date('2024-05-11'),
      machine_id: this.generateIndex(),
      return_condition: true
    },
    {
      id: this.generateIndex(),
      start_date: new Date('2024-05-05'),
      end_date: new Date('2024-05-15'),
      machine_id: this.generateIndex(),
      return_condition: false
    },
    {
      id: this.generateIndex(),
      start_date: new Date('2024-05-10'),
      end_date: new Date('2024-05-20'),
      machine_id: this.generateIndex(),
      return_condition: true
    },
    {
      id: this.generateIndex(),
      start_date: new Date('2024-05-15'),
      end_date: new Date('2024-05-25'),
      machine_id: this.generateIndex(),
      return_condition: false
    },
    {
      id: this.generateIndex(),
      start_date: new Date('2024-05-20'),
      end_date: new Date('2024-05-30'),
      machine_id: this.generateIndex(),
      return_condition: true
    },
    {
      id: this.generateIndex(),
      start_date: new Date('2024-05-25'),
      end_date: new Date('2024-06-04'),
      machine_id: this.generateIndex(),
      return_condition: false
    },
    {
      id: this.generateIndex(),
      start_date: new Date('2024-06-01'),
      end_date: new Date('2024-06-11'),
      machine_id: this.generateIndex(),
      return_condition: true
    },
    {
      id: this.generateIndex(),
      start_date: new Date('2024-06-05'),
      end_date: new Date('2024-06-15'),
      machine_id: this.generateIndex(),
      return_condition: false
    },
    {
      id: this.generateIndex(),
      start_date: new Date('2024-06-10'),
      end_date: new Date('2024-06-20'),
      machine_id: this.generateIndex(),
      return_condition: true
    },
    {
      id: this.generateIndex(),
      start_date: new Date('2024-06-15'),
      end_date: new Date('2024-06-25'),
      machine_id: this.generateIndex(),
      return_condition: false
    },
    {
      id: this.generateIndex(),
      start_date: new Date('2024-06-20'),
      end_date: new Date('2024-06-30'),
      machine_id: this.generateIndex(),
      return_condition: true
    }
  ];

  ngAfterViewInit() {
    this.dataSource.data = this.rentals
    this.dataSource.paginator = this.paginator;
  }
}
