import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularDialogComponent, AngularDialogModel } from './angular-dialog/angular-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRUD-with-Validations';

  result: string = "";

  constructor(public dialog: MatDialog){

  }

  openDialog(): void{
    // this.dialog.open(AngularDialogComponent)
    const message = "Are you sure ?";

    const dialogData = new AngularDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(AngularDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    })
  }
  
}