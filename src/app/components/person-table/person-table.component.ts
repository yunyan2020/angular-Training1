import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import { IPerson } from 'src/app/IPerson';
import { MatDialog } from '@angular/material/dialog';
import { EditPersonComponent } from 'src/app/dialogs/edit-person/edit-person.component';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})  

export class PersonTableComponent implements OnChanges {

  @Input() persons!: IPerson[];
  @Output() eventDeletePerson = new EventEmitter<number>();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  
  displayedColumns: string[] = ['id', 'name', 'phoneNr','city','menu'];
  dataSource!: MatTableDataSource<IPerson>;
  selectedValue!: string;
  filteredPersons!: IPerson[];

  constructor(
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer) {   
     }   
  

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.persons)
    this.dataSource = new MatTableDataSource(this.persons);
    this.dataSource.sort = this.sort;
  }
   

  onDelete(person: IPerson) {
    this.eventDeletePerson.emit(person.id)    
  }

  onClickEditPerson(person: IPerson) {
    const dialogRef = this.dialog.open(EditPersonComponent, { data: person.id });
    
    dialogRef.afterClosed().subscribe(
      (persons) => {
        if (persons) {
          this.persons = persons;
        }
      }
    );
  } 

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onCityChange(cityName: string) {
    if (cityName == "1") {
      this.dataSource = new MatTableDataSource(this.persons)
    } else {
      this.filteredPersons = this.persons.filter(p => p.city === cityName);
      this.dataSource = new MatTableDataSource(this.filteredPersons)
    }
    
  }

} 
