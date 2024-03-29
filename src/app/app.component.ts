import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MachinesComponent } from './machines/machines.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, MachinesComponent, MatTableModule, MatPaginatorModule]
})
export class AppComponent {

}
