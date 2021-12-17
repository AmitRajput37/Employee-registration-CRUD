import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularDialogComponent } from '../angular-dialog/angular-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup;

  isSubmitted  =  false;
  result: string = "";
  email: any;
  password: any;
  isLoggedIn: boolean;


  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router,
     public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['', Validators.required]
    })
  }

  userNotFoundDialog(): void{
    const message = "User not found";

    const dialogRef = this.dialog.open(AngularDialogComponent,{
      maxWidth:"400px",
      data: {message: message, type: 'Not Found Alert'}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    })
  }

  somethingWentWrongDialog():void{
    const message = "Something went wrong";

    const addDialogRef = this.dialog.open(AngularDialogComponent, {
      maxWidth: "400px",
      data: {message: message, type: 'Error Alert'}
    });

    addDialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    })
  }

  loginDialog(): void{
    const message = "Login Successfull";

    const addDialogRef = this.dialog.open(AngularDialogComponent, {
      maxWidth: "400px",
      data: {message: message, type: 'Login Alert'}
    });

    addDialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    })
  }
  // login(){
  
  // }
  login(){
    this.http.get<any>("http://localhost:3000/signup")
    .subscribe(res => {
      const user = res.find((a:any) => {
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });

      console.log(this.loginForm.value);
      if(this.loginForm.invalid){
        return;
      }
      if(user){
        this.isLoggedIn = true;
        // alert("login success !!");
        this.loginDialog();
        this.loginForm.reset();
        this.router.navigate(['dashboard'])
      }else{
        alert("user not found !!");
      }
    }, err => {
      // alert("Something went wrong !!");
      this.somethingWentWrongDialog()
    })
  }

}
