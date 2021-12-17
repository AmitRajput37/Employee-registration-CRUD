import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../employee-dashboard/employee.dashboard.model';
import { LoginComponent } from '../login/login.component';
import { AuthorizeService } from './authorize.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  employeeModelObj : EmployeeModel = new EmployeeModel();
  constructor() { }

  canActivate(): boolean {
    if(localStorage.getItem('email'))
      return false;
  }
}
