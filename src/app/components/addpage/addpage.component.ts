import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { env } from '../../../env';

@Component({
  selector: 'app-addpage',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './addpage.component.html',
  styleUrl: './addpage.component.css'
})
export class AddpageComponent {

  title = ""
  inputFields: InputField[] = [];
  formData: any = {};
  private apiUrl = env.apiUrl;
  route = ''


  companyFields: InputField[] = [
    { label: 'Name', type: 'text', id: 'name', name: 'name' },
    { label: 'Representative', type: 'text', id: 'representative', name: 'representative' },
    { label: 'Tax Number', type: 'text', id: 'taxnumber', name: 'taxnumber' },
    { label: 'Company Registration Number', type: 'text', id: 'company_reg_number', name: 'company_reg_number' },
    { label: 'Headquarters', type: 'text', id: 'headquarters', name: 'headquarters' },
  ];
  machineFields: InputField[] = [
    { label: 'Brand', type: 'text', id: 'brand', name: 'brand' },
    { label: 'Name', type: 'text', id: 'name', name: 'name' },
    { label: 'Type', type: 'text', id: 'type', name: 'type' },
    { label: 'Power', type: 'text', id: 'power', name: 'power' },
    { label: 'Weight', type: 'text', id: 'weight', name: 'weight' },
    { label: 'Deposit', type: 'text', id: 'deposit', name: 'deposit' },
    { label: 'Lease', type: 'text', id: 'lease', name: 'lease' },
  ];
  rentalFields: InputField[] = [
    { label: 'Company', type: 'text', id: 'company', name: 'company' },
    { label: 'Machine', type: 'text', id: 'machine', name: 'machine' },
    { label: 'Start Date', type: 'text', id: 'start_date', name: 'start_date' },
  ];


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if (window.location.href.includes('company')) {
      this.inputFields = this.companyFields;
      this.title = "New Company"
      this.route = 'companies'
    }
    if (window.location.href.includes('machine')) {
      this.inputFields = this.machineFields;
      this.title = "New Machine"
      this.route = 'machines'
    }
    if (window.location.href.includes('rental')) {
      this.inputFields = this.rentalFields;
      this.title = "New Rental"
      this.route = 'rentals'
    }
  }
  
  addItem(): void {
    const isEmptyField = this.inputFields.some(field => {
      const value = (document.getElementById(field.id) as HTMLInputElement).value;
      return !value.trim();
    });

    if (isEmptyField) {
      console.error('Please fill in all fields.');
      return;
    }

    this.formData = {};
    this.inputFields.forEach(field => {
      this.formData[field.name] = (document.getElementById(field.id) as HTMLInputElement).value;
    });

    this.http.post(`${this.apiUrl}/machine`, this.formData)
      .subscribe(
        response => {
          window.location.replace(`/${this.route}`)
          console.log('Success:', response);
        },
        error => {
          console.error('Error:', error);
        }
      );
      
  }
}

interface InputField {
  label: string;
  type: string;
  id: string;
  name: string;
}
