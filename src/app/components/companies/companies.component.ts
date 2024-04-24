import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Company } from '../../models/company.model';

@Component({
    selector: 'app-companies',
    standalone: true,
    imports: [MatTableModule, MatPaginatorModule],
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

    ngAfterViewInit() {
        this.dataSource.data = this.companies
        this.dataSource.paginator = this.paginator;
    }
}
