import { Injectable } from '@angular/core';
import { map, Subject, timer } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { IEmploymentData } from '../IEmploymentData';
import { IPerson } from '../IPerson';
import { IPersonMaxId } from '../IPersonMaxId';

let PEOPLE: IPerson[] = [
  { name: 'Victoria', id: 1, phoneNr: 23428997, city: 'LUND' },
  { name: 'Erik', id: 2, phoneNr: 2342117, city: 'MALMÖ' },
  { name: 'Stefon', id: 3, phoneNr: 234284597, city: 'STOCKHOLM' },
  { name: 'Alice', id: 4, phoneNr: 70632590, city: 'ESLÖV' },
  { name: 'Anna', id: 5, phoneNr: 70683290, city: 'GOTHENBURG' },
]

let EMPOLOYMENT_DATA: IEmploymentData[] = [
  { personId: 1, employmentYear: "2019", salary: 68000 },
  { personId: 2, employmentYear: "2020", salary: 36000 },
  { personId: 3, employmentYear: "2020", salary: 40000 },
  { personId: 4, employmentYear: "2021", salary: 42000 },
  { personId: 5, employmentYear: "2017", salary: 51000 },
]

const ids = PEOPLE.map(p => { return p.id })
let personMaxId = Math.max(...ids) + 1;

@Injectable({
  providedIn: 'root'
})

export class PersonService {
  maxPersonId!: number;
  public $addPersonEvent = new Subject<IPerson[]>();

  constructor() {       
   }
 

  getPeople(): Observable<IPerson[]> {
    return timer(1000).pipe(map(n => PEOPLE))
  }

  getPersonById(id: number): Observable<IPerson> {
    for (let i = 0; i < PEOPLE.length; i++) {
      if (PEOPLE[i].id === id) {
        return of(PEOPLE[i]);
      }
    }
    return of(PEOPLE[0]);
  }

  getMaxPersonId(): number {
    return personMaxId;
  }

  updatePerson(person: IPerson): Observable<IPerson[]> {
    console.log("person", person)
    for (let i = 0; i < PEOPLE.length; i++) {
      if (PEOPLE[i].id === person.id) {
        PEOPLE[i].name = person.name;
        PEOPLE[i].phoneNr = person.phoneNr;
        PEOPLE[i].city = person.city;
        return of(PEOPLE);
      }
    }
    return of(PEOPLE);
  }

  addPerson(person: IPerson): Observable<IPerson[]> {
    PEOPLE.push(person);
    const ids = PEOPLE.map(p => { return p.id })
    personMaxId = Math.max(...ids) + 1;
    this.$addPersonEvent.next(PEOPLE);
    return of(PEOPLE);
  }

  deletePerson(personId: number): Observable<IPerson[]> {
    const newArray = PEOPLE.slice();
    newArray.splice(newArray.findIndex((p) => p.id === personId), 1)
    PEOPLE = newArray
    return of(PEOPLE)
  }

  getEmploymentData(personId: number): Observable<IEmploymentData> {
    let index = EMPOLOYMENT_DATA.findIndex((e) => e.personId === personId)
    return of(EMPOLOYMENT_DATA[index])
  }

}
