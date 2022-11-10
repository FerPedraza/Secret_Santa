import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from 'src/app/shared/services/http/http.service';


import{ RaffleResponse, RaffleSequence } from '../../interfaces/raffle';
import { RaffleService } from '../../services/raffle.service';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  raffle: RaffleSequence[] = [];
  constructor(private _httpService: HttpService, private _raffleService: RaffleService,
    private _router: Router) { }

  ngOnInit(): void {
    console.log(this._raffleService.getPeople());
    console.log(this._raffleService.getGroups());
    
    this._httpService.request<RaffleResponse>('POST','api/raffle',{People: this._raffleService.getPeople(),
      Groups: this._raffleService.getGroups()
    }).subscribe(res => {
      console.log(res); 
      this.raffle = res.data.raffleSequence;
      
    });
  }
  back(){
    this._raffleService.addGroups([]);
    this._raffleService.addPeople([]);
    this._router.navigateByUrl('main/people');
  }

}
