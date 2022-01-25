import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularDialogComponent } from '../angular-dialog/angular-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../shared/model/user.model';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm : FormGroup;
  
  signupObj : UserModel=  new UserModel();

  result: string ="";
  submitted : boolean = false;

  constructor( private formBuilder : FormBuilder, private http: HttpClient, private router: Router, 
    private dialog: MatDialog, private api : ApiService) { 

      this.signupForm = this.formBuilder.group({
        fullname  : new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 _]*')]),
        mobile  : new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[0-9]*')]),
        email  : new FormControl('', [Validators.required, Validators.email]),
        password : new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmpassword : new FormControl('', [Validators.required]),
        usertype : ["", Validators.required]
        // email: ['',Validators.required],
        // password: ['', Validators.required]
      },
      {
        validators: this.MustMatch('password', 'confirmpassword')
      }
      )
    }

    get f () { return this.signupForm.controls}
    get email() {return this.signupForm.get('email')}
    get password() {return this.signupForm.get('password')}
    get mobile() {return this.signupForm.get('mobile')}
    get fullname() { return this.signupForm.get('fullname')}
    get usertype() { return this.signupForm.get('usertype')}

    MustMatch(controlName: string, matchingControlName: string  ){
      return(formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const mathchingControl = formGroup.controls[matchingControlName];
        if(mathchingControl.errors && !mathchingControl.errors.mustMatch){
          return
        }

        if(control.value !== mathchingControl.value){
          mathchingControl.setErrors({mustMatch:true})
        }
        else{
          mathchingControl.setErrors(null)
        }
      }
    }

  ngOnInit(): void {
  }
  

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

  
  
  // signUp(){
  //   this.submitted = true;
  //   if(this.signupForm.invalid){
  //     return;
  //   }
  //   this.http.post<any>("http://localhost:3000/signup", this.signupForm.value)
  //   .subscribe(res => {
      
  //     this.signupForm.reset();
  //     this.signupDialog();
  //     // alert("Signup successfull");
  //     this.router.navigate(['login']);
  //   },
  //   err => {
  //     // alert("Something went wrong");
  //     this.somethingWentWrongDialog()
  //   })
  // }

  signUp(){
    this.submitted = true;
    if(this.signupForm.invalid){
      return this.somethingWentWrongDialog();
    }
    this.signupObj.FullName = this.signupForm.value.fullname
    this.signupObj.Email = this.signupForm.value.email
    this.signupObj.Password = this.signupForm.value.password
    this.signupObj.UserType = this.signupForm.value.usertype
    this.signupObj.Mobile = this.signupForm.value.mobile
    this.api.signUp(this.signupObj)
    .subscribe(res => {
      alert(res.message);
      this.signupForm.reset();
      this.router.navigate(['login']);
    })
  }


}
