import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Company } from '../../models/company.model';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-companies',
    standalone: true,
    imports: [MatTableModule, MatPaginatorModule,RouterModule],
    templateUrl: './companies.component.html',
    styleUrl: './companies.component.css'
})
export class CompaniesComponent implements AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    generateIndex(): string {
        const randomNumber = Math.floor(Math.random() * 1000000);
        return randomNumber.toString().padStart(6, '0');
    }

    displayedColumns: string[] = ['_id', 'name', 'representative', 'taxnumber', 'company_reg_number', 'headquarters', 'balance',];
    dataSource: MatTableDataSource<Company> = new MatTableDataSource<Company>();

    companies: Company[] = [];

    constructor(private http: HttpClient) { }

    ngAfterViewInit() {
        this.fetchData();
    }

    fetchData() {
        this.http.get<Company[]>('http://localhost:3000/company')
            .subscribe(data => {
                this.companies = data;
                this.dataSource.data = this.companies;
                this.dataSource.paginator = this.paginator;
                console.log(this.companies);
            });
    }
}
