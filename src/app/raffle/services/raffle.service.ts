import { Injectable } from '@angular/core';
import { Group, Person, RaffleRequest } from '../interfaces/raffle';

@Injectable({
  providedIn: 'root'
})
export class RaffleService {
  private people: Person[] = [];
  private groups: Group[] = [];
  private req: RaffleRequest = {People:[],Groups: []};

  constructor() { }
  addPeople(people: Person[]) {
    this.people = people;
  }
  getPeople() {
    return this.people;
  }
  addGroups(groups: Group[]) {
    this.groups = groups;
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
