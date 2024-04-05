import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Machine } from '../../models/machine.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-machines',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.css'
})
export class MachinesComponent implements AfterViewInit{

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  generateIndex(): string {
    const randomNumber = Math.floor(Math.random() * 1000000);
    return randomNumber.toString().padStart(6, '0');
  }

  addNewData(){

  }

  displayedColumns: string[] = ['id','brand', 'name', 'type', 'power', 'weight', 'deposit', 'lease'];
  dataSource: MatTableDataSource<Machine> = new MatTableDataSource<Machine>();




  machines: Machine[] = [
    {
      id: this.generateIndex(),
      brand: 'Brand1',
      name: 'Machine1',
      type: 'Type1',
      power: 1000,
      weight: 500,
      deposit: 2000,
      lease: 300
    },
    {
      id: this.generateIndex(),
      brand: 'Brand2',
      name: 'Machine2',
      type: 'Type2',
      power: 1500,
      weight: 600,
      deposit: 2500,
      lease: 350
    },
    {
      id: this.generateIndex(),
      brand: 'Brand3',
      name: 'Machine3',
      type: 'Type3',
      power: 1200,
      weight: 550,
      deposit: 2200,
      lease: 320
    },
    {
      id: this.generateIndex(),
      brand: 'Brand4',
      name: 'Machine4',
      type: 'Type4',
      power: 1100,
      weight: 480,
      deposit: 2100,
      lease: 310
    },
    {
      id: this.generateIndex(),
      brand: 'Brand5',
      name: 'Machine5',
      type: 'Type5',
      power: 1250,
      weight: 700,
      deposit: 2300,
      lease: 330
    },
    {
      id: this.generateIndex(),
      brand: 'Brand6',
      name: 'Machine6',
      type: 'Type6',
      power: 1350,
      weight: 800,
      deposit: 2700,
      lease: 370
    },
    {
      id: this.generateIndex(),
      brand: 'Brand7',
      name: 'Machine7',
      type: 'Type7',
      power: 1400,
      weight: 900,
      deposit: 2600,
      lease: 360
    },
    {
      id: this.generateIndex(),
      brand: 'Brand8',
      name: 'Machine8',
      type: 'Type8',
      power: 1600,
      weight: 950,
      deposit: 2800,
      lease: 380
    },
    {
      id: this.generateIndex(),
      brand: 'Brand9',
      name: 'Machine9',
      type: 'Type9',
      power: 1700,
      weight: 1000,
      deposit: 2900,
      lease: 390
    },
    {
      id: this.generateIndex(),
      brand: 'Brand10',
      name: 'Machine10',
      type: 'Type10',
      power: 1800,
      weight: 1100,
      deposit: 3000,
      lease: 400
    },
  ];
  

  ngAfterViewInit() {
    this.dataSource.data = this.machines
    this.dataSource.paginator = this.paginator;
  }

}
