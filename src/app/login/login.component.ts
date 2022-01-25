import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularDialogComponent } from '../angular-dialog/angular-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../shared/model/user.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup;
  loginObj : UserModel = new UserModel();
  public isInValid : boolean;
  submitted : boolean = false;

  isSubmitted  =  false;
  result: string = "";
  email: any;
  password: any;


  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router,
     public dialog: MatDialog, private api : ApiService) {  
       localStorage.clear() 
      
       this.loginForm = this.formBuilder.group({
        email  : new FormControl(null, [Validators.required]),
        password : new FormControl('', [Validators.required, Validators.minLength(6)]),
        // email: ['',Validators.required],
        // password: ['', Validators.required]
      })
      }

      get f () { return this.loginForm.controls}

  ngOnInit(): void {
    // this.loginForm = this.formBuilder.group({
    //   username  : new FormControl(null, [Validators.required])
    //   // email: ['',Validators.required],
    //   // password: ['', Validators.required]
    // })
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

  
  // login(): void{
  //   this.submitted = true;
  //   var isChecked = true;
  //   this.http.get<any>("http://localhost:3000/signup")
  //   .subscribe(res => {
  //     const user = res.find((a:any) => {
  //       return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
  //     });

  //     console.log(this.loginForm.value);
  //     if(this.loginForm.invalid){
  //       isChecked = false;
  //       return;
  //     }
  //     if(user){
  //       // alert("login success !!");
        
  //       this.loginDialog();
  //       localStorage.setItem('token', "abcdefgh");
  //       this.loginForm.reset();
  //       this.router.navigate(['dashboard'])
  //     }else{
  //       // alert("user not found !!");
  //       this.userNotFoundDialog();
  //     }
  //   }, err => {
  //     // alert("Something went wrong !!");
  //     this.somethingWentWrongDialog()
  //   })
  // }

  login(){
    this.loginObj.Email = this.loginForm.value.email;
    this.loginObj.Password = this.loginForm.value.password;
    this.api.login(this.loginObj)
    .subscribe(res => {
      alert(res.message);
      this.loginForm.reset();
      this.router.navigate(['dashboard']);
    })
  }
}
