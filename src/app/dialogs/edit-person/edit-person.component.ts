import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonService } from 'src/app/data/person.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
  orignalName!: string;
  name!: string;
  phoneNr!: number;
  city!: string;


  constructor(
    public dialogRef: MatDialogRef<EditPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number,
    public _personService: PersonService,

  ) {
    this._personService.getPersonById(this.id).subscribe(
      (people) => {
        this.orignalName = people.name;
        this.name = people.name;
        this.phoneNr = people.phoneNr;
        this.city = people.city;
      }
    );
  }

  ngOnInit(): void {
    this.name = this.orignalName
   }


  onSave() {
    const personInfo = {
      id: this.id,
      name: this.name,
      phoneNr: this.phoneNr,
      city:this.city
    }
    console.log("personInfo", personInfo)
    this._personService.updatePersonName(personInfo).subscribe(
      (people) => {
        console.log("people", people);
        this.dialogRef.close(people);
      },
    )

  }

  onCancel() {
    this.dialogRef.close(null);  
  }

}
