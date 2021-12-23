import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularDialogComponent } from '../angular-dialog/angular-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm : FormGroup;
  result: string ="";

  constructor( private formBuilder : FormBuilder, private http: HttpClient, private router: Router, private dialog: MatDialog) { }

  
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname : ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required],
      mobile : ['', Validators.required]
    })

    
  }
  // fullname = new FormControl('', [Validators.required])
  // email = new FormControl('', [Validators.required, Validators.email])
  // password = new FormControl('', [Validators.required])
  // mobile = new FormControl('', [Validators.required])

  // getErrorMessage() {
  //   if (this.fullname.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

  signupDialog(): void{
    const message = "Sign Up Successfull";

    const addDialogRef = this.dialog.open(AngularDialogComponent, {
      maxWidth: "400px",
      data: {message: message, type: 'Sign up Alert'}
    });

    addDialogRef.afterClosed().subscribe(dialogResult => {
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
  
  signUp(){
    this.http.post<any>("http://localhost:3000/signup", this.signupForm.value)
    .subscribe(res => {
      
      this.signupForm.reset();
      this.signupDialog();
      // alert("Signup successfull");
      this.router.navigate(['login']);
    },
    err => {
      // alert("Something went wrong");
      this.somethingWentWrongDialog()
    })
  }


}
