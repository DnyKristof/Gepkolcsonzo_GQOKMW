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
export class CompaniesComponent implements AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  generateIndex(): string {
    const randomNumber = Math.floor(Math.random() * 1000000);
    return randomNumber.toString().padStart(6, '0');
  }

  displayedColumns: string[] = ['id','name', 'representative', 'taxnumber', 'company_reg_number', 'headquarters', 'balance',];
  dataSource: MatTableDataSource<Company> = new MatTableDataSource<Company>();

  companies: Company[] = [
    {
        id: this.generateIndex(),
        name: "Tech Innovators Inc.",
        representative: "John Doe",
        taxnumber: "123456789",
        company_reg_number: "ABC123",
        headquarters: "San Francisco, CA",
        balance: 1000000,
        machines: []
    },
    {
        id: this.generateIndex(),
        name: "Green Energy Solutions Ltd.",
        representative: "Jane Smith",
        taxnumber: "987654321",
        company_reg_number: "XYZ789",
        headquarters: "New York, NY",
        balance: 500000,
        machines: []
    },
    {
        id: this.generateIndex(),
        name: "Global Logistics Corp.",
        representative: "Michael Johnson",
        taxnumber: "456789123",
        company_reg_number: "DEF456",
        headquarters: "London, UK",
        balance: 750000,
        machines: []
    },
    {
        id: this.generateIndex(),
        name: "BioTech Research Institute",
        representative: "Emily Williams",
        taxnumber: "789123456",
        company_reg_number: "GHI789",
        headquarters: "Boston, MA",
        balance: 1200000,
        machines: []
    },
    {
        id: this.generateIndex(),
        name: "Foodie Ventures LLC",
        representative: "David Brown",
        taxnumber: "654321987",
        company_reg_number: "JKL012",
        headquarters: "Chicago, IL",
        balance: 600000,
        machines: []
    },
    {
        id: this.generateIndex(),
        name: "AeroTech Industries",
        representative: "Jessica Lee",
        taxnumber: "321654987",
        company_reg_number: "MNO345",
        headquarters: "Los Angeles, CA",
        balance: 850000,
        machines: []
    },
    {
        id: this.generateIndex(),
        name: "CleanTech Solutions",
        representative: "Andrew Taylor",
        taxnumber: "987654321",
        company_reg_number: "PQR678",
        headquarters: "Seattle, WA",
        balance: 400000,
        machines: []
    },
    {
        id: this.generateIndex(),
        name: "Fashion Forward Inc.",
        representative: "Sophia Garcia",
        taxnumber: "741852963",
        company_reg_number: "STU901",
        headquarters: "Miami, FL",
        balance: 950000,
        machines: []
    },
    {
        id: this.generateIndex(),
        name: "MediCare Health Services",
        representative: "Ethan Clark",
        taxnumber: "852963741",
        company_reg_number: "VWX234",
        headquarters: "Houston, TX",
        balance: 1100000,
        machines: []
    },
    {
        id: this.generateIndex(),
        name: "Renewable Energy Solutions",
        representative: "Olivia Adams",
        taxnumber: "369852147",
        company_reg_number: "YZA567",
        headquarters: "Denver, CO",
        balance: 670000,
        machines: []
    },
    {
        id: this.generateIndex(),
        name: "TechWare Innovations",
        representative: "Daniel Martinez",
        taxnumber: "159487263",
        company_reg_number: "BCD890",
        headquarters: "Austin, TX",
        balance: 780000,
        machines: []
    },
    {
        id: this.generateIndex(),
        name: "Eco-Friendly Foods Inc.",
        representative: "Isabella Thompson",
        taxnumber: "456123789",
        company_reg_number: "EFG012",
        headquarters: "Portland, OR",
        balance: 530000,
        machines: []
    },
    {
        id: this.generateIndex(),
        name: "Smart Solutions Group",
        representative: "Noah Wilson",
        taxnumber: "258369147",
        company_reg_number: "HIJ345",
        headquarters: "San Diego, CA",
        balance: 880000,
        machines: []
    }
];

ngAfterViewInit() {
  this.dataSource.data = this.companies
  this.dataSource.paginator = this.paginator;
}
}
