import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/data/person.service';
import { IPerson } from 'src/app/IPerson';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  persons!: IPerson[];
  loadingPersonTableData!: boolean;

  constructor(
    private _personService:PersonService,
    private router: Router
  )
  {
    this.loadingPersonTableData = true
    this._personService.getPeople().subscribe(
      (people) => {
        this.persons = people;
        this.loadingPersonTableData = false;
      }
    ); 
    
   }

  ngOnInit(): void {
  }

  onEventDeletePerson(personId: number):void{
    this._personService.deletePerson(personId).subscribe( 
      (people) => {
        this.persons =people;
      }
    );
  }

  onClickAddPerson() {
    this.router.navigate([`/add-person`]);
  }

}
