import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/data/person.service';
import { IEmploymentData } from 'src/app/IEmploymentData';
import { IPerson, ITableItem } from 'src/app/IPerson';
import { forkJoin } from 'rxjs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(  )
  {   }

  ngOnInit(): void {
   
    
  }  
  

 

}
