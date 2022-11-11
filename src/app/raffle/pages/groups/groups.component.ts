import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


import { Group, Person, RaffleRequest } from '../../interfaces/raffle';
import { RaffleService } from '../../services/raffle.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  people: Person[] = [];
  groups: Group[] = [];
  selectedPeople: Person[] = [];
  peopleLength: number = 0;
  groupNameForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  constructor(private _raffleService: RaffleService, private _router: Router) { }
  
  ngOnInit(): void {
    this._raffleService.selectedPeople$.subscribe((value) => {
      if(!(Object.keys(value).length === 0)){
        this.people = Object.create(value);
        this.peopleLength = this.people.length;
      }
    });
    this._raffleService.selectedGroups$.subscribe((value) => {
      if(!(Object.keys(value).length === 0)){
        this.groups = value;
      }
    });
    if(this.people.length < 2){
      Swal.fire({
        title: 'Oh oh!',
        text: 'There must be at least two people to carry out the draw',
        icon: 'warning',
        confirmButtonText: 'ok',
        confirmButtonColor: '#3a7e44'
      }).then(() => {
        this._router.navigate(['main/people']);
      });
    }
  }
  next(){
    this._raffleService.setGroups(this.groups);

    this._router.navigateByUrl('main/results');

  }
  back(){
    this.people = [];
    this.groups = [];
    this._router.navigateByUrl('main/people');
  }
  onSubmit(selectedPeople: any, formDirective: FormGroupDirective){
    if(this.selectedPeople.length > this.peopleLength/2){
      Swal.fire({
        title: 'Oh oh!',
        text: 'The number of members in a group is too large for the draw',
        icon: 'warning',
        confirmButtonText: 'ok',
        confirmButtonColor: '#3a7e44'
      });
      return;
    }
    if(this.groupNameForm.valid && this.selectedPeople.length > 1){
      if(this.groups.find((obj)=>{
        return obj.name == this.groupNameForm.value.name;
      })==undefined){
        this.groups.push({name: this.groupNameForm.value.name!, people: this.selectedPeople});
        this.groupNameForm.reset();  
        this.groupNameForm.controls.name.reset();  
        formDirective.resetForm();
        this.selectedPeople.forEach( (itemSelected, indexSelected) => {
          this.people.forEach((item: { name: string; },index: any) =>{
            if(itemSelected.name == item.name){
              this.people.splice(index,1);

            }
          });
        });
        this.selectedPeople = [];
      }
      else{
        Swal.fire({
          title: 'Oh oh!',
          text: 'This name is already entered',
          icon: 'warning',
          confirmButtonText: 'ok',
          confirmButtonColor: '#3a7e44'
        });
      }
    }else{
      Swal.fire({
        title: 'Oh oh!',
        text: 'Groups must have at least 2 members ',
        icon: 'warning',
        confirmButtonText: 'ok',
        confirmButtonColor: '#3a7e44'
      });
    }

  }
  removeGroup(index: number){
    this.groups[index].people.forEach(item =>{
      this.people.push(item);
    });

    this.groups.splice(index,1);

  }
  removePeople(indexG: number,indexP: number){
    
      
    this.people.push(this.groups[indexG].people[indexP]);

    this.groups[indexG].people.splice(indexP,1);

  }


  
  onNgModelChange(d: any){

  }
}
