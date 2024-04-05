import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MachinesComponent } from './components/machines/machines.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NavbarComponent } from "./components/navbar/navbar.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, MachinesComponent, MatTableModule, MatPaginatorModule, NavbarComponent]
})
export class AppComponent {

}
