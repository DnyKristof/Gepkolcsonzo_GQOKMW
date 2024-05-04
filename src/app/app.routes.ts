import { RouterModule, Routes } from '@angular/router';
import { MachinesComponent } from './components/machines/machines.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { NgModule } from '@angular/core';
import { AddpageComponent } from './components/addpage/addpage.component';
import { DetailsComponent } from './components/details/details.component';
import { RentaldetailsComponent } from './components/rentaldetails/rentaldetails.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: 'machines', component: MachinesComponent },
    { path: 'companies', component: CompaniesComponent },
    { path: 'rentals', component: RentalsComponent },
    { path: 'companies/:id', component: DetailsComponent },
    { path: "addpage/rental", component: AddpageComponent },
    { path: "addpage/machine", component: AddpageComponent },
    { path: "addpage/company", component: AddpageComponent },
    { path: "addpage/transaction", component: AddpageComponent },
    { path: 'rentals/:id', component: RentaldetailsComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
