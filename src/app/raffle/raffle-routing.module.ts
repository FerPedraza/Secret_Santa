import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './pages/groups/groups.component';
import { MainComponent } from './pages/main/main.component';
import { PeopleComponent } from './pages/people/people.component';
import { ResultsComponent } from './pages/results/results.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [{
      path: 'people',
      component: PeopleComponent,
    },{
      path: 'groups',
      component: GroupsComponent,
    },{
      path: 'results',
      component: ResultsComponent,
    },
    { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaffleRoutingModule { }
