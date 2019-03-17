import { Component, OnInit, ViewChild, ElementRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Student } from '../student';
import { StudentService } from '../student.service';

// To CRUD Service
import { CrudService } from '../service/crud.service';

import { FormControl, FormGroup, Validators, FormBuilder, Form } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
// export class LoginComponent implements OnInit {

//   hide = true;

//   @ViewChild('idInput') idInput: ElementRef;
//   @ViewChild('passwordInput') passwordInput: ElementRef;

//   student = new Student();
//   constructor(
//     private studentService: StudentService,
//     private router: Router
//   ) { }

//   id: string;
//   password: string;

//   ngOnInit() {
//   }

//   async login(pelajar: Student) {

//     const result = await this.studentService.getStudent(pelajar.id, pelajar.password);
//     console.log(result);

//     if (result) {
//       this.router.navigate(["address"]);
//       return;
//     }
//     alert('Invalid');
//   }


// }



// FOR TESTING DB CONNECTION

export class LoginComponent {

  studentForm: FormGroup;
  student: any;

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private toastr: ToastrService) {

      this.studentForm = this.fb.group({
        id: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])]
      });
    }

    saveStudentDetails(values) {
      const studentData = {};

      studentData['id'] =  values.id;
      studentData['password'] =  values.password;

      this.crudService.loginstudent(studentData).subscribe(result => {
        this.student = result;
        this.toastr.success('You are logged in', 'Success !', { positionClass: 'toast-bottom-right' });
        console.log(this.crudService.loginstudent);
        this.router.navigate(['/address']);
      },
        err => {
          console.log('status code ->' + err.status);
          this.toastr.error('Please try again', 'Error !', { positionClass: 'toast-bottom-right' });
    });
  }
}
