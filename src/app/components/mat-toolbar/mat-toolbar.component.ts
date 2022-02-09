import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mat-toolbar',
  templateUrl: './mat-toolbar.component.html',
  styleUrls: ['./mat-toolbar.component.css']
})
export class MatToolbarComponent implements OnInit {

  constructor(private router: Router) {    
   }

  ngOnInit(): void {
  }


  onClickAddPerson() {
    this.router.navigate([`/add-person`]);
  }

}
