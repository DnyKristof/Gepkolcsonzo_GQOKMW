import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  id: string = "";
  api: string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || "";
    });
    if (window.location.href.includes('company')) {
      this.api = 'company'
    }
    if (window.location.href.includes('machine')) {
      this.api = 'machine'
    }
    if (window.location.href.includes('rental')) {
      this.api = 'rental'
    }
  }

}
