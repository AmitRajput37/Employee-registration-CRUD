import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public loginAPIUrl : string = "https://localhost:44321/api/Login/"
  public employeeAPIUrl : string = "https://localhost:44321/api/Employee/"

  constructor(private http: HttpClient) { }

  postEmployee(data: any){
    return this.http.post<any>(`${this.employeeAPIUrl}add_employee`, data)
    .pipe(map((res: any)=> {
      return res;
    }))
  }

  getEmployee(){
    return this.http.get<any>(`${this.employeeAPIUrl}get_all_employees`)
    .pipe(map((res: any)=> {
      return res;
    }))
  }

  updateEmployee(data: any){
    return this.http.put<any>(`${this.employeeAPIUrl}update_employee`, data)
    .pipe(map((res: any)=> {
      return res;
    }))
  }

  deleteEmployee(id: number){
    return this.http.delete<any>(`${this.employeeAPIUrl}delete_employee/`+ id)
    .pipe(map((res: any)=> {
      return res;
    }))
  }

  signUp(empObj : any){
    // return this.http.post<any>(this.loginAPIUrl+"signup",empObj)
    return this.http.post<any>(`${this.loginAPIUrl}signup`,empObj)
  }

  login(empObj : any){
    // return this.http.post<any>(this.loginAPIUrl+"login",empObj)
    return this.http.post<any>(`${this.loginAPIUrl}login`,empObj)
  }
}
