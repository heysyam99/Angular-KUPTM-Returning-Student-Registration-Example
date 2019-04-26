import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private auth: CrudService,
    private route: Router,
    private toastr: ToastrService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.route.navigate(['login']);
      this.toastr.error('Please Login', 'An error has occured !', { positionClass: 'toast-bottom-right' });
      return false;
    }
  }
}
