import { Injectable } from '@angular/core';
import { map, timer } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { IPerson } from '../IPerson';
import { IPersonMaxId } from '../IPersonMaxId';

let PEOPLE: IPerson[] = [
  { name: 'Christian', id: 1, phoneNr: 23428997, city: 'LUND' },
  { name: 'Jonathan', id: 2, phoneNr: 2342117, city: 'MALMÖ' },
  { name: 'Yunyan', id: 3, phoneNr: 234284597, city: 'STOCKHOLM' },
  { name: 'Alice', id: 4, phoneNr: 70632590, city: 'ESLÖV' },
  { name: 'Anna', id: 5, phoneNr: 70683290, city: 'GOTHENBURG' },
]

const ids = PEOPLE.map(p => { return p.id })
let personMaxId = Math.max(...ids) + 1;

@Injectable({
  providedIn: 'root'
})

export class PersonService {
  maxPersonId!: number;

  constructor() { }

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

  updatePersonName(person: IPerson): Observable<IPerson[]> {
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
    console.log("person", person)
    PEOPLE.push(person);
    const ids = PEOPLE.map(p => { return p.id })
    personMaxId = Math.max(...ids) + 1;
    return of(PEOPLE);
  }

  deletePerson(personId: number): Observable<IPerson[]> {
    const newArray = PEOPLE.slice();
    newArray.splice(newArray.findIndex((p) => p.id === personId), 1)
    PEOPLE = newArray
    return of(PEOPLE)
  }

}
