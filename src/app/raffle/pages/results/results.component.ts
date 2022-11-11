import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


import { HttpService } from 'src/app/shared/services/http/http.service';
import{ Group, Person, RaffleResponse, RaffleSequence } from '../../interfaces/raffle';
import { RaffleService } from '../../services/raffle.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  raffle: RaffleSequence[] = [];
  people: Person[] = [];
  groups: Group[] = [];
  displayedColumns: string[] = ['giving', 'icon', 'receiving'];
  dataSource: RaffleSequence[] = [];
  loading: boolean = true;
  constructor(private _httpService: HttpService, private _raffleService: RaffleService,
    private _router: Router) { }

  ngOnInit(): void {
    this._raffleService.selectedPeople$.subscribe((value) => {
      if(!(Object.keys(value).length === 0)){
        this.people = value;
      }
    });

    this._raffleService.selectedGroups$.subscribe((value) => {
      if(!(Object.keys(value).length === 0)){
        this.groups = value;
      }
    });
    this._httpService.request<RaffleResponse>('POST','api/raffle',{People: this.people,
      Groups: this.groups
    }).subscribe(
      res => { 
      if(res.code != 0){
        Swal.fire({
          title: 'Something went wrong, try again later',
          text: res.message,
          icon: 'warning',
          confirmButtonText: 'ok',
          confirmButtonColor: '#3a7e44'
        }).then(() => {
          this.clean();
        });
      }
      this.raffle = res.data.raffleSequence;
      this.dataSource = this.raffle;
      if(this.raffle.length > 0){
        this.loading = false;
      }
    }, error => {
      Swal.fire({
        title: 'Oh oh!',
        text: 'Something went wrong, try again later',
        icon: 'warning',
        confirmButtonText: 'ok',
        confirmButtonColor: '#3a7e44'
      }).then(() => {
        this.clean();
      });
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
  clean(){ 
    this._raffleService.setGroups([]);
    this._raffleService.setPeople([]);
    this._router.navigateByUrl('main/people');
  }
  back(){
    this.people = [];
    this.groups = [];
    this._router.navigateByUrl('main/groups');
  }

}
