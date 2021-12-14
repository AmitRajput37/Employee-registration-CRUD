import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularDialogComponent } from './angular-dialog/angular-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRUD-with-Validations';

  constructor(public dialog: MatDialog){}

  openDialog(){
    this.dialog.open(AngularDialogComponent);
  }
  
}