import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/data/person.service';
import { IEmploymentData } from 'src/app/IEmploymentData';
import { IPerson, ITableItem } from 'src/app/IPerson';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  persons!: IPerson[] ;
  tableItems: ITableItem[] = [];
  employment!: IEmploymentData;
  personAndEmployments!: ITableItem;
  loadingPersonTableData!: boolean;

  constructor(
    private _personService:PersonService,
    private router: Router
  )
  {
    this.loadingPersonTableData = true
    console.log("this.persons", this.persons);
    
    this._personService.getPeople().subscribe(
      (people) => {
        this.persons = people;
        this.getEmploymentData();
        this.loadingPersonTableData = false;
      }
    );
    
   }

  ngOnInit(): void {
  }

  onEventDeletePerson(personId: number):void{
    this._personService.deletePerson(personId).subscribe( 
      (people) => {
        this.persons = people;  
        this.getEmploymentData();
      }
    );
  }

  onClickAddPerson() {
    this.router.navigate([`/add-person`]);
  }

  getEmploymentData() {  
    this.tableItems = [];
    this.persons.map((p) => {
      this._personService.getEmploymentData(p.id).subscribe(
        (employment) => {
          this.employment = employment;
        }
      )
      this.personAndEmployments = {
        id: p.id,
        name: p.name,
        city: p.city,
        phoneNr: p.phoneNr,
        employmentYear: this.employment.employmentYear,
        salary: this.employment.salary
      }
      this.tableItems.push(this.personAndEmployments)
      
    }
    )    
  }

  getEmploymentData2() {
    
  }

}
