import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { env } from '../../../env';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private apiUrl = env.apiUrl;
  formData: any = {};

  constructor(private http: HttpClient) { }

  Login() {
    console.log("i am happening")
    this.http.post<any>(`${this.apiUrl}/login`, this.formData)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          window.location.href = '/machines';
        },
        error => {
          alert('Error logging in');
          console.log('Error:', error);
        }
      );
  }

}
