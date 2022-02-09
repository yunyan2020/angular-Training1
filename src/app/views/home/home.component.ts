import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/data/person.service';
import { IEmploymentData } from 'src/app/IEmploymentData';
import { IPerson, ITableItem } from 'src/app/IPerson';
import { forkJoin} from 'rxjs';

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
        //this.getEmploymentData2();
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
       // this.getEmploymentData();
        this.getEmploymentData2();
      }
    );
  }

  getEmploymentData() {  
    this.tableItems = [];
    this.persons.map((p) => {
      this._personService.getEmploymentData(p.id).subscribe(
        (employment) => {
          this.employment = employment;
        }
      )
      if (this.employment) {
        this.personAndEmployments = {
          ...p,
          employmentYear: this.employment.employmentYear,
          salary: this.employment.salary
        }
       
      } else 
      {
        this.personAndEmployments = {
          ...p,
          employmentYear: "",
          salary: 0
        }
      }
      this.tableItems.push(this.personAndEmployments)      
    }
    )    
  }
 
  getEmploymentData2() {    
    this.tableItems = [];  
    const getEmploymentCalls = this.persons.map((person) => this._personService.getEmploymentData(person.id));
    forkJoin(getEmploymentCalls).subscribe((empoloyments) => {
      console.log(empoloyments);  
      this.persons.map((p) => {
        let index = empoloyments.findIndex((e) => { if (e) { e.personId === p.id } })
        this.personAndEmployments = {...p,
          employmentYear: empoloyments[index].employmentYear,
          salary: empoloyments[index].salary
        }
        this.tableItems.push(this.personAndEmployments)
      })
    })
  }
  

}
