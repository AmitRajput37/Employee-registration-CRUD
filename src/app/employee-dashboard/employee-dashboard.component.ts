import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AngularDialogComponent } from '../angular-dialog/angular-dialog.component';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee.dashboard.model';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  // employeeData: any;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'mobile', 'salary', 'action'];

  dataSource: MatTableDataSource<EmployeeModel>;
  
  formValue: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  showAdd: boolean;
  showUpdate: boolean;
  result: string = "";

  @ViewChild(MatSort) sort: MatSort;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      salary: ['', Validators.required],

    })

    this.getAllEmployee();
    
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllEmployee() {
    this.api.getEmployee()
      .subscribe(res => {
        // this.employeeData = res;
        this.dataSource = new MatTableDataSource(res);
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
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails() {
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

  // sortTable() {
  //   var table, rows, switching, i, x, y, shouldSwitch;
  //   table = document.getElementById("emp-table");
  //   switching = true;
  //   /* Make a loop that will continue until
  //   no switching has been done: */
  //   while (switching) {
  //     // Start by saying: no switching is done:
  //     switching = false;
  //     rows = table.rows;
  //     /* Loop through all table rows (except the
  //     first, which contains table headers): */
  //     for (i = 1; i < (rows.length - 1); i++) {
  //       // Start by saying there should be no switching:
  //       shouldSwitch = false;
  //       /* Get the two elements you want to compare,
  //       one from current row and one from the next: */
  //       x = rows[i].getElementsByTagName("TD")[0];
  //       y = rows[i + 1].getElementsByTagName("TD")[0];
  //       // Check if the two rows should switch place:
  //       if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
  //         // If so, mark as a switch and break the loop:
  //         shouldSwitch = true;
  //         break;
  //       }
  //     }
  //     if (shouldSwitch) {
  //       /* If a switch has been marked, make the switch
  //       and mark that a switch has been done: */
  //       rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
  //       switching = true;
  //     }
  //   }
  // }
}
