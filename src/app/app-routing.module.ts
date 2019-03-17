import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { FinanceComponent } from './finance/finance.component';
import { AddressComponent } from './address/address.component';
import { TesingComponent } from './tesing/tesing.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'address', component: AddressComponent },
  { path: 'finance', component: FinanceComponent },
  { path: 'tesing', component: TesingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
