import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AngularDialogComponent } from '../angular-dialog/angular-dialog.component';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee.dashboard.model';



// const DATA: EmployeeModel[]=[
//   {id: 1, firstName:'Amit', lastName:'Maiyar', email:'amit@gmail.com', mobile:'9890984945', salary:'89000' }
// ]


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol']

  // dataSource = new MatTableDataSource(DATA)

  // applyFilter(filterValue: string){
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  formValue : FormGroup;

  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData : any;
  showAdd : boolean;
  showUpdate : boolean;
  result: string = "";

  
  constructor(private formBuilder: FormBuilder,
    private api: ApiService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', Validators.required],
      mobile : ['', Validators.required],
      salary : ['', Validators.required],

    })

    this.getAllEmployee();

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

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res => {
      console.log(res);
      // alert("Employee Added Successfully");
      
      let ref = document.getElementById('cancel');
      ref.click();
      this.formValue.reset();
      this.addDialog();
      this.getAllEmployee();
      
    },
    err => {
      // alert("Something went wrong");
      this.somethingWentWrongDialog();
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

  deleteDialog(row:any): void{
    const message = "Are you sure ?";


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
