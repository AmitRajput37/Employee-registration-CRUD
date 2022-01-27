import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AngularDialogComponent } from '../angular-dialog/angular-dialog.component';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee.dashboard.model';
import { MatSort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  // employeeData: any;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'mobile', 'salary', 'action'];

  dataSource: MatTableDataSource<EmployeeModel>;

  public formValue: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  showAdd: boolean;
  showUpdate: boolean;
  result: string = "";

  @ViewChild(MatSort) sort: MatSort;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService, public dialog: MatDialog, private router: Router, public translate: TranslateService) {
    
  }

  ngOnInit() {
    const token = localStorage.getItem('token')
    console.log(token);
    if (localStorage.getItem('token') != null){
      this.router.navigateByUrl('/dashboard');
      
    }
      

    this.formValue = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      salary: ['', Validators.required],

    })

    this.getAllEmployee();

    

  }

  public selectLanguage(event:any){
    console.log(event)
    this.translate.use(event.value);
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllEmployee() {
    this.api.getEmployee()
      .subscribe(res => {
        // this.employeeData = res;
        this.dataSource = new MatTableDataSource(res.employeeDetails);
        this.dataSource.sort = this.sort;
      })

  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
    console.log(this.formValue)
    if (this.formValue.invalid) {
      alert("Fill all the fields");
      return;
    }
    this.employeeModelObj.FirstName = this.formValue.controls.firstName.value;
    this.employeeModelObj.LastName = this.formValue.controls.lastName.value;
    this.employeeModelObj.Email = this.formValue.controls.email.value;
    this.employeeModelObj.Mobile = this.formValue.controls.mobile.value;
    this.employeeModelObj.Salary = this.formValue.controls.salary.value;
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


  somethingWentWrongDialog(): void {
    const message = "Something went wrong";

    const addDialogRef = this.dialog.open(AngularDialogComponent, {
      maxWidth: "400px",
      data: { message: message, type: 'Error Alert' }
    });

    addDialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    })
  }

  deleteDialog(row: any): void {
    const message = "Are you sure ?";


    const dialogRef = this.dialog.open(AngularDialogComponent, {

      maxWidth: "400px",
      data: { message: message, type: 'Confirmation' }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (dialogResult == true) {
        this.deleteEmployee(row);
      }
    })
  }

  addDialog(): void {
    const message = "Employee added successfully";

    const addDialogRef = this.dialog.open(AngularDialogComponent, {
      maxWidth: "400px",
      data: { message: message, type: 'Add Alert' }
    });

    addDialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    })
  }

  updateDialog(): void {
    const message = "Employee details updated successfully";

    const updateDialogRef = this.dialog.open(AngularDialogComponent, {
      maxWidth: "400px",
      data: { message: message, type: 'Update Alert' }
    });

    updateDialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    })
  }



  deleteEmployee(row: any) {

    this.api.deleteEmployee(row.id)
      .subscribe(res => {
        // alert("Employee Deleted")
        this.getAllEmployee();
      })
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.Id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails() {
    this.employeeModelObj.FirstName = this.formValue.controls.firstName.value;
    this.employeeModelObj.LastName = this.formValue.controls.lastName.value;
    this.employeeModelObj.Email = this.formValue.controls.email.value;
    this.employeeModelObj.Mobile = this.formValue.controls.mobile.value;
    this.employeeModelObj.Salary = this.formValue.controls.salary.value;

    this.api.updateEmployee(this.employeeModelObj)
      .subscribe(res => {
        // alert("Employee details updated successfully");
        this.updateDialog();
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      })
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
