import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Rental } from '../../models/rental.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { env } from '../../../env';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-rentals',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, DatePipe, RouterModule],
  templateUrl: './rentals.component.html',
  styleUrl: './rentals.component.css'
})
export class RentalsComponent implements AfterViewInit {
  private apiUrl = env.apiUrl;
  public chart: any = null;
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





  displayedColumns: string[] = ['_id', 'start_date', 'end_date', 'machine', 'company', 'return_condition'];
  dataSource: MatTableDataSource<Rental> = new MatTableDataSource<Rental>();

  rentals: Rental[] = [];

  constructor(private http: HttpClient) { }

  ngAfterViewInit() {
    this.fetchData();
  }

  createChart() {
    const counts = this.rentals.reduce((acc, rental) => {
      if (rental.return_condition) {
        acc.ok += 1;
      } else {
        acc.damaged += 1;
      }
      return acc;
    }, { ok: 0, damaged: 0 });

    if (this.rentals && this.rentals.length > 0) {
      this.chart = new Chart("MyChart", {
        type: 'pie',

        data: {
          labels: ["Returned OK", "Returned Damaged"],
          datasets: [
            {
              label: "",
              data: [counts.ok,counts.damaged],
              backgroundColor: ['rgb(54, 162, 235)',
                'rgb(255, 205, 86)']
            },
          ]
        },
        options: {
          aspectRatio: 10
        }

      });
    }
  }

  fetchData() {
    this.http.get<Rental[]>(`${this.apiUrl}/rental`)
      .subscribe(data => {
        this.rentals = data;
        this.dataSource.data = this.rentals;
        this.dataSource.paginator = this.paginator;
        this.createChart();
      });
  }

}
