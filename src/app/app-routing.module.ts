import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './shared/pages/error/error.component';

const routes: Routes = [
{
  path: 'main',
  loadChildren: () => import('./raffle/raffle.module').then( m => m.RaffleModule )
},
{
  path: '404',
  component: ErrorComponent
},
{
  path: '**',
  redirectTo: '404'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
