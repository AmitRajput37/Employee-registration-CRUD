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
  submitted : boolean = false;

  constructor( private formBuilder : FormBuilder, private http: HttpClient, private router: Router, 
    private dialog: MatDialog) { 

      this.signupForm = this.formBuilder.group({
        fullname  : new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 _]*')]),
        mobile  : new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[0-9]*')]),
        email  : new FormControl('', [Validators.required, Validators.email]),
        password : new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9_]*')]),
        confirmpassword : new FormControl('', [Validators.required])
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
    // this.signupForm = this.formBuilder.group({
    //   fullname : ['', Validators.required],
    //   email : ['', Validators.required],
    //   password : ['', Validators.required],
    //   mobile : ['', Validators.required]
    // })

    
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
    this.submitted = true;
    if(this.signupForm.invalid){
      return;
    }
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
