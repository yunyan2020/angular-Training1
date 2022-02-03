import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonService } from 'src/app/data/person.service';
import { EditPersonComponent } from 'src/app/dialogs/edit-person/edit-person.component';
import { IPerson } from 'src/app/IPerson';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  people!: IPerson[];

  constructor(
    private _personService: PersonService,
    public dialog: MatDialog
  )
  {
    this._personService.getPeople().subscribe(
      res => this.people = res
    );
   }

  ngOnInit(): void {
  }

  openEditPerson(id:number) {
    const dialogRef = this.dialog.open(EditPersonComponent, { data: id });
    dialogRef.afterClosed().subscribe(
      people => {
        this.people = people;     
      }
    );
  }

  deletePerson(id: number) {
    
  }



}
