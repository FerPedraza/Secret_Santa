import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaffleRoutingModule } from './raffle-routing.module';
import { PeopleComponent } from './pages/people/people.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { ResultsComponent } from './pages/results/results.component';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './pages/main/main.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PeopleComponent,
    GroupsComponent,
    ResultsComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RaffleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RaffleModule { }
