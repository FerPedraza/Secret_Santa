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
  groupNameForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  constructor(private _raffleService: RaffleService, private _router: Router) { }
  
  ngOnInit(): void {
    
    this.people = Object.create(this._raffleService.getPeople());
    
  }
  next(){
    
    this._raffleService.addGroups(this.groups);
    this._router.navigateByUrl('main/results');

  }
  back(){
    this.people = [];
    this.groups = [];
    this._router.navigateByUrl('main/people');
  }
  onSubmit(selectedPeople: any, formDirective: FormGroupDirective){
     //this.people = Object.create(this._raffleService.getPeople());
    if(this.groupNameForm.valid){
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
              console.log(this.people);
              console.log(this._raffleService.getPeople());

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
    }

  }
  onNgModelChange(d: any){

  }
}
