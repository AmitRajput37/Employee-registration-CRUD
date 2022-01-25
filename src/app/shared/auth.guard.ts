import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AngularDialogComponent } from '../angular-dialog/angular-dialog.component';
// import { Observable } from 'rxjs';
// import { LoginComponent } from '../login/login.component';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   result : string = '';
//   constructor(private auth: AuthService, private router: Router, private dialog: MatDialog){

//   }
//   // canActivate() {
//   //   if(this.auth.IsLoggedIn()){
//   //     return true;
//   //   }
//   //   this.notLoggedInDialog();
//   //   // alert("you are not logged in")
//   //   this.router.navigate(['login']);
//   //   return false;
    
//   // }

//   notLoggedInDialog(): void{
//     const message = "You are not logged in";

//     const addDialogRef = this.dialog.open(AngularDialogComponent, {
//       maxWidth: "400px",
//       data: {message: message, type: 'Not logged in Alert'}
//     });

//     addDialogRef.afterClosed().subscribe(dialogResult => {
//       this.result = dialogResult;
//     })
//   }
  
// }
