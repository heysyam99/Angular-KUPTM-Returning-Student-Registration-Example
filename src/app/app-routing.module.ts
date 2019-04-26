import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { FinanceComponent } from './finance/finance.component';
import { AddressComponent } from './address/address.component';
import { RentAddressComponent } from './rent-address/rent-address.component';
import { VerifyComponent } from './verify/verify.component';

import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'address', component: AddressComponent, canActivate: [AuthGuard] },
  { path: 'rental-address', component: RentAddressComponent, canActivate: [AuthGuard] },
  { path: 'finance', component: FinanceComponent, canActivate: [AuthGuard] },
  { path: 'verify', component: VerifyComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
