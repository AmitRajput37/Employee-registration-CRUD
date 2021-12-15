import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AngularDialogComponent, AngularDialogModel } from '../angular-dialog/angular-dialog.component';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee.dashboard.model';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue : FormGroup;

  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData : any;
  showAdd : boolean;
  showUpdate : boolean;
  result: string = "";

  
  constructor(private formBuilder: FormBuilder,
    private api: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', Validators.required],
      mobile : ['', Validators.required],
      salary : ['', Validators.required],

    })

    this.getAllEmployee();

    // this.formValue = new FormGroup({
    //   'firstName' : new FormControl('null', Validators.required),
    // });
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    console.log(this.formValue)
    this.employeeModelObj.firstName = this.formValue.controls.firstName.value;
    this.employeeModelObj.lastName = this.formValue.controls.lastName.value;
    this.employeeModelObj.email = this.formValue.controls.email.value;
    this.employeeModelObj.mobile = this.formValue.controls.mobile.value;
    this.employeeModelObj.salary = this.formValue.controls.salary.value;

    // this.employeeModelObj.firstName = this.formValue.value.firstName;
    // this.employeeModelObj.lastName = this.formValue.value.lastName;
    // this.employeeModelObj.email = this.formValue.value.email;
    // this.employeeModelObj.mobile = this.formValue.value.mobile;
    // this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res => {
      console.log(res);
      // alert("Employee Added Successfully");
      this.addDialog();
      // this.openDialog();
      let ref = document.getElementById('cancel');
      ref.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err => {
      alert("Something went wrong");
    })
  }

  // openDialog(): void{
  //   // this.dialog.open(AngularDialogComponent)
  //   const message = "Are you sure ?";

  //   const dialogData = new AngularDialogComponent("Confirm Action", message);
  // }

  deleteDialog(row:any): void{
    // this.dialog.open(AngularDialogComponent)
    const message = "Are you sure ?";

   // const dialogData = new AngularDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(AngularDialogComponent, {
      
      maxWidth: "400px",
      data: {message: message, type: 'Confirmation'}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if(dialogResult == true){
        this.deleteEmployee(row);
      }
    })
  }

  addDialog(): void{
    const message = "Employee added successfully";

    const addDialogRef = this.dialog.open(AngularDialogComponent, {
      maxWidth: "400px",
      data: {message: message, type: 'Add Alert'}
    });

    addDialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    })
  }

  updateDialog(): void{
    const message = "Employee details updated successfully";

    const updateDialogRef = this.dialog.open(AngularDialogComponent,{
      maxWidth: "400px",
      data: {message: message, type:'Update Alert'}
    });

    updateDialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    })
  }

  // addDialog(): void{
  //   const msg = "Employee Added Successfully";

  //   const dialogData = new AngularDialogModel("Confirm Action", msg);

  //   const dialogRef = this.dialog.open(AngularDialogComponent, {
      
  //     maxWidth: "400px",
  //     data: dialogData
  //   });
  // }

  // onConfirm(): void{
  //   this.dialogRef.close(true);
  // }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res => {
      this.employeeData = res;
    })
  }

  deleteEmployee(row : any){
    
   this.api.deleteEmployee(row.id)
    .subscribe(res => {
      // alert("Employee Deleted")
      this.getAllEmployee();
    })
  }

  onEdit( row:any ){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.controls.firstName.value;
    this.employeeModelObj.lastName = this.formValue.controls.lastName.value;
    this.employeeModelObj.email = this.formValue.controls.email.value;
    this.employeeModelObj.mobile = this.formValue.controls.mobile.value;
    this.employeeModelObj.salary = this.formValue.controls.salary.value;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(res => {
      // alert("Employee details updated successfully");
      this.updateDialog();
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

  

}
