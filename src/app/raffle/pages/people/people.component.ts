import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { RaffleService } from '../../services/raffle.service';
import { Person } from '../../interfaces/raffle';
import { Router } from '@angular/router';
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  people: Person[] = [];
  nameForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  
  constructor(private _raffleService: RaffleService, private _router: Router) { }

  ngOnInit(): void {
    this._raffleService.selectedPeople$.subscribe((value) => {
    if(!(Object.keys(value).length === 0)){
      this.people = value;
    
    }
    });
  }

  onSubmit(formData: any, formDirective: FormGroupDirective){
    if(!(Object.keys(this.people).length === 0)){
    if(this.nameForm.valid){
      if(this.people.find((obj)=>{
        return obj.name == this.nameForm.value.name;
      })==undefined){
        this.people.push({name: this.nameForm.value.name!, id: 0});
        this.nameForm.reset();  
        this.nameForm.controls.name.reset();  
        formDirective.resetForm();
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
    }else{
      this.people.push({name: this.nameForm.value.name!, id: 0});
      this.nameForm.reset();  
      this.nameForm.controls.name.reset();  
      formDirective.resetForm();
    }
     
  }
  next(){
    this._raffleService.setPeople(this.people);
    this._router.navigateByUrl('main/groups');
  }
  remove(indexPerson: number){
    this.people.splice(indexPerson,1);
  }
}
