import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/data/person.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  personId?: number;
  personName?: string;
  phoneNr?: number;
  city?: string;

  constructor(
    public _personService: PersonService,
    private router: Router,
    public dialogRef: MatDialogRef<AddPersonComponent>
  ) { }

  ngOnInit(): void {
  }

  onAddPerson() {
    this.personId = this._personService.getMaxPersonId()  
    
    if (      
      !this.personName ||
      !this.phoneNr ||
      !this.city
    ) {
      return;
    }
    

    const personInfo = {
      id: this.personId,
      name: this.personName,
      phoneNr: this.phoneNr,
      city:this.city
    }

    this._personService.addPerson(personInfo).subscribe(
      (people) => {
        console.log("people", people);
        this.dialogRef.close(people);
       //  this.router.navigate(['/']);
      }
    )

    
  }

}
