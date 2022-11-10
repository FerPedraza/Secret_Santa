import { Injectable } from '@angular/core';
import { Group, Person, RaffleRequest } from '../interfaces/raffle';

@Injectable({
  providedIn: 'root'
})
export class RaffleService {
  people: Person[] = [];
  groups: Group[] = [];
  req: RaffleRequest = {People:[],Groups: []};

  constructor() { }
  addPeople(people: Person[]) {
    this.people = [...this.people,...people];
  }
  getPeople() {
    return this.people;
  }
  addGroups(groups: Group[]) {
    this.groups = [...this.groups,...groups];
  }
  getGroups() {
    return this.groups;
  }
  addReq(req: RaffleRequest) {
    this.req = req;
  }
  getReq() {
    return this.req;
  }
  


}
