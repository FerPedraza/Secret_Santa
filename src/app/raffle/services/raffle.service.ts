import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Group, Person, RaffleRequest } from '../interfaces/raffle';

@Injectable({
  providedIn: 'root'
})
export class RaffleService {
  private people: Person[] = [];
  private groups: Group[] = [];
  private req: RaffleRequest = {People:[],Groups: []};
  private people$ = new BehaviorSubject<any>({});
  selectedPeople$ = this.people$.asObservable();
  private groups$ = new BehaviorSubject<any>({});
  selectedGroups$ = this.groups$.asObservable();
  

  constructor() { }
  setPeople(people: Person[]) {
    this.people$.next(people);
  }

  setGroups(groups: Group[]) {
    this.groups$.next(groups);
  }


}
