import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MachinesComponent } from './components/machines/machines.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CompaniesComponent } from './components/companies/companies.component';
import { RentalsComponent } from './components/rentals/rentals.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, MachinesComponent, MatTableModule,
              MatPaginatorModule, NavbarComponent,CompaniesComponent,
              RentalsComponent]
})
export class AppComponent {

}
