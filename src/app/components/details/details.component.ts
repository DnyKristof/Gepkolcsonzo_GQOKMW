import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../models/company.model';
import { env } from '../../../env';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../models/transaction.model';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  id: string = "";
  private apiUrl = env.apiUrl;
  company: Company | null = null
  editMode : boolean = false;
  addBalanceMode : boolean = false;
  formData: any = {};
  balanceFormData: any = {};
  headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  startDate: string | undefined;
  endDate: string | undefined;
  filteredTransactions: Transaction[] | undefined = [];

  constructor(private route: ActivatedRoute,private http: HttpClient) { }

  transactions: Transaction[] | undefined = [];
  

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || "";
    });
    this.fetchDetails();
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }
  toggleAddBalance(): void {
    this.addBalanceMode = !this.addBalanceMode;
  }

  addBalance() {
    this.balanceFormData.amount = parseFloat(this.balanceFormData.amount);
    this.balanceFormData.start_date = new Date();
    this.balanceFormData.end_date = new Date();
    this.balanceFormData.company_id = this.id;

    this.http.post<any>(`${this.apiUrl}/transaction`,this.balanceFormData)
    .subscribe(
      response => {
        window.location.reload();
      },
      error => {
        console.error('Error:', error);
      })
  }


  fetchDetails() {
    this.http.get<Company>(`${this.apiUrl}/company/${this.id}`)
    .subscribe(data => {
      this.company = data;
    });
    this.http.get<Transaction[]>(`${this.apiUrl}/transaction/${this.id}`)
    .subscribe(data => {
      this.transactions = data;
      this.filteredTransactions = data;
    });
  }

  saveChanges() {
    console.log(this.formData);
    this.http.put<Company>(`${this.apiUrl}/company/${this.id}`,this.formData,{ headers: this.headers })
    .subscribe(
      response => {
        window.location.replace(`/companies`)
      },
      error => {
        console.error('Error:', error);
        alert("Please log in to edit a company.")
      })
  }

  filterTransactions(): void {
    if (this.startDate && this.endDate) {
      this.filteredTransactions = this.transactions && this.transactions.filter((transaction) => {

        const startDate = new Date(transaction.start_date || "");
        const endDate = new Date(transaction.end_date || "");

        const selectedStartDate = new Date(this.startDate || "");
        const selectedEndDate = new Date(this.endDate || "");
        return startDate >= selectedStartDate && endDate <= selectedEndDate;
      });
    }
    console.log("Filtered: ",this.filteredTransactions);
    console.log("All: " ,this.transactions);
    console.log("gec: ",this.filteredTransactions);
  }
  resetFilter(): void {
    this.startDate = undefined;
    this.endDate = undefined;
    this.filteredTransactions = this.transactions;
  }

}
