import { Component, OnInit } from '@angular/core';

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
  constructor(private _httpService: HttpService, private _raffleService: RaffleService) { }

  ngOnInit(): void {

    var data = this._raffleService.getReq();
    this._httpService.request<RaffleResponse>('POST','api/raffle',data).subscribe(res => {
      console.log(res);
      this.raffle = res.data.raffleSequence;
      
    });
  }
  back(){

  }

}
