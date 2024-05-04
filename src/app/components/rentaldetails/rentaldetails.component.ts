import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { env } from '../../../env';
import { Rental } from '../../models/rental.model';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-rentaldetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rentaldetails.component.html',
  styleUrl: './rentaldetails.component.css'
})
export class RentaldetailsComponent {
  private apiUrl = env.apiUrl;
  rental: any = null;
  id: string = "";
  endMode : boolean = false;
  headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  constructor(private http: HttpClient,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || "";
    });
    this.fetchDetails();
  }

  fetchDetails() {
    this.http.get<Rental>(`${this.apiUrl}/rental/${this.id}`)
    .subscribe(data => {
      this.rental = data;
      console.log(this.rental);
    });
  }
  toggleEndMode(): void {
    this.endMode = !this.endMode;
  }
  
  endRental(returnCondition: boolean) {
    this.http.post<any>(`${this.apiUrl}/rental/${this.id}/end`,{return_condition: returnCondition},{headers: this.headers})
    .subscribe(
      response => {
        window.location.replace(`/rentals`)
        console.log('Success:', response);
      },
      error => {
        console.error('Error:', error);
      })
  }

  goodReturnCondition() {
    this.endRental(true);
  }

  badReturnCondition() {
    this.endRental(false);
  }


}
