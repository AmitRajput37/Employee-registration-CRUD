import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeDashboardComponent } from '../employee-dashboard/employee-dashboard.component';


@Component({
  selector: 'app-angular-dialog',
  templateUrl: './angular-dialog.component.html',
  styleUrls: ['./angular-dialog.component.css']
})
export class AngularDialogComponent implements OnInit {

  title: string = '';
  message: string;

  constructor(public dialogRef: MatDialogRef<AngularDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { 
     // this.title = data.title;
      this.message = data.message
      
    }

  ngOnInit(): void {
  }

  onConfirm(): void{
    this.dialogRef.close(true);
  }

  onDismiss(): void{
    this.dialogRef.close(false);
  }
}

export class AngularDialogModel {
  constructor( public title: string, public message: string){

  }
} 
