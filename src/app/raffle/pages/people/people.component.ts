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

  }

  onSubmit(formData: any, formDirective: FormGroupDirective){
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
     
  }
  next(){
    this._raffleService.addPeople([]);
    this._raffleService.addPeople(this.people);
    this._router.navigateByUrl('main/groups');
  }
}
