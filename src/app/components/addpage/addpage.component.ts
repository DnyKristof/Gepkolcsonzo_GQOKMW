import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { env } from '../../../env';
import { HttpHeaders } from '@angular/common/http';

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
  api = ""
  headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);


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
    { label: 'Company', type: 'text', id: 'company_id', name: 'company_id' },
    { label: 'Machine', type: 'text', id: 'machine_id', name: 'machine_id' },
  ];


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if (window.location.href.includes('company')) {
      this.inputFields = this.companyFields;
      this.title = "New Company"
      this.route = 'companies'
      this.api = 'company'
    }
    if (window.location.href.includes('machine')) {
      this.inputFields = this.machineFields;
      this.title = "New Machine"
      this.route = 'machines'
      this.api = 'machine'
    }
    if (window.location.href.includes('rental')) {
      this.inputFields = this.rentalFields;
      this.title = "New Rental"
      this.route = 'rentals'
      this.api = 'rental'
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

    this.http.post(`${this.apiUrl}/${this.api}`, this.formData, { headers: this.headers })
      .subscribe(
        response => {
          window.location.replace(`/${this.route}`)
          console.log('Success:', response);
        },
        error => {
          console.error('Error:', error);
          alert("Please log in to add a new item.")
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
