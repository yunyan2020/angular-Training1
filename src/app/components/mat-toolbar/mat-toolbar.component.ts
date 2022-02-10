import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddPersonComponent } from 'src/app/views/add-person/add-person.component';

@Component({
  selector: 'app-mat-toolbar',
  templateUrl: './mat-toolbar.component.html',
  styleUrls: ['./mat-toolbar.component.css']
})
export class MatToolbarComponent implements OnInit {

  constructor(private router: Router,
    public dialog: MatDialog) {    
   }

  ngOnInit(): void {
  }


  onClickAddPerson() {
    // this.router.navigate([`/add-person`]);
    const dialogRef = this.dialog.open(AddPersonComponent);
    dialogRef.afterClosed().subscribe(
      (persons) => {
        console.log("persons", persons)
        if (persons) {
         /*  this.persons = persons;
          this.dataSource = new MatTableDataSource(this.persons);
          this.dataSource.sort = this.sort; */
        }
      }
    );
  }

}
