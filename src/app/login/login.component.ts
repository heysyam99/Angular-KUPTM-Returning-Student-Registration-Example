import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { ModalDirective } from 'angular-bootstrap-md';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private toastr: ToastrService) {

    this.studentForm = this.fb.group({
      id: ['', Validators.compose([Validators.required])],
      ic: ['', Validators.compose([Validators.required])]
    });
  }

  studentForm: FormGroup;
  errorMsg;
  public loading = false;

  @ViewChild('demoBasic') demoBasic: ModalDirective;

  ngOnInit() {
    this.crudService.logout();

    this.toastr.info('<h6>For best experience, you are recommended to use Google Chrome on your Personal Computer (Laptop, PC, etc..)<h6>',
    'Information !', { positionClass: 'toast-bottom-left', tapToDismiss: false, enableHtml: true, timeOut: 120000 });
  }

  saveStudentDetails(values) {
    const studentData = {};

    studentData['id'] = values.id;
    studentData['ic'] = values.ic;

    this.crudService.loginStudent(studentData).subscribe(result => {
        this.crudService.sendToken(this.studentForm.value.id);
        this.toastr.success('You are logged in', 'Success !', { positionClass: 'toast-bottom-right' });
        this.router.navigate(['/address']);
    },
      err => {
        if (err.error.message) {
          this.errorMsg = err.error.message;
          this.showAndHideModal();
        } else {
          console.log(err);
          this.toastr.error('Please try again', 'Error !', { positionClass: 'toast-bottom-right',
                            timeOut: 6000, progressBar: true });
        }
      });
  }

  showAndHideModal() {
    this.demoBasic.show();

    setTimeout(() => {
      this.demoBasic.hide();
    }, 10500);
  }

}
