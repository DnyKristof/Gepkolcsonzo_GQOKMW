import { RouterModule, Routes } from '@angular/router';
import { MachinesComponent } from './components/machines/machines.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { NgModule } from '@angular/core';
import { AddpageComponent } from './components/addpage/addpage.component';
import { DetailsComponent } from './components/details/details.component';

export const routes: Routes = [
    { path: 'machines', component: MachinesComponent },
    { path: 'companies', component: CompaniesComponent },
    { path: 'rentals', component: RentalsComponent },
    { path: 'machines/:id', component: DetailsComponent },
    { path: 'companies/:id', component: DetailsComponent },
    { path: 'rentals/:id', component: DetailsComponent },
    { path: "addpage/rental", component: AddpageComponent },
    { path: "addpage/machine", component: AddpageComponent },
    { path: "addpage/company", component: AddpageComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
