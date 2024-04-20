import { Routes } from '@angular/router';
import { MachinesComponent } from './components/machines/machines.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { RentalsComponent } from './components/rentals/rentals.component';

export const routes: Routes = [
    { path: 'machines', component: MachinesComponent },
    { path: 'companies', component: CompaniesComponent },
    { path: 'rentals', component: RentalsComponent },
    { path: 'machines/:id', component: MachinesComponent },
    { path: 'companies/:id', component: CompaniesComponent },
    { path: 'rentals/:id', component: RentalsComponent }

];
