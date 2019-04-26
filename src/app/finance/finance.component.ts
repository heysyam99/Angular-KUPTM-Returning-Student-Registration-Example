import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CrudService } from '../service/crud.service';
import { ToastrService } from 'ngx-toastr'
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {

  @ViewChild('demoBasic') demoBasic: ModalDirective;

  constructor(private router: Router,
    private fb: FormBuilder,
    private crudService: CrudService,
    private toastr: ToastrService) {
    this.studentForm = this.fb.group({
      refNumber: ['', Validators.compose([Validators.required])],
      amount: ['', Validators.compose([Validators.required])],
      datePaid: ['', Validators.compose([Validators.required])],
    });

    this.uploadForm = this.fb.group({
      filename: ['', Validators.compose([Validators.required])]
    });

    this.imageUrl = sessionStorage.getItem('image');
  }

  studentForm: FormGroup;
  uploadForm: FormGroup;
  imageUrl = '../../assets/upload.png';
  fileToUpload: File = null;


  ngOnInit() {
    this.studentForm = this.fb.group({
      refNumber: ['', Validators.compose([Validators.required])],
      amount: ['', Validators.compose([Validators.required])],
      datePaid: ['', Validators.compose([Validators.required])],
    });

    this.uploadForm = this.fb.group({
      filename: ['', Validators.compose([Validators.required])]
    });

    this.crudService.getStudentFinance().subscribe((response: any) => {
      this.studentForm.patchValue(response.data);
    });
  }

  saveStudentDetails(values) {

    const studentData = { };

    studentData['refNumber'] = values.refNumber;
    studentData['amount'] = values.amount;
    studentData['datePaid'] = values.datePaid;

    this.crudService.updateStudentFinance(studentData).subscribe(result => {
      this.toastr.success('Your data has been inserted', 'Success !', { positionClass: 'toast-bottom-right' });
      this.router.navigate(['/verify']);
    },
      err => {
        console.log('status code ->' + err.status);
        this.toastr.error('Please try again', 'Error !', { positionClass: 'toast-bottom-right' });
      });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    // Show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
}

  uploadFileToActivity() {
    this.crudService.postImage(this.fileToUpload).subscribe(data => {
      this.toastr.success('Your data has been inserted', 'Success !', { positionClass: 'toast-bottom-right' });
      }, err => {
        console.log('status code ->' + err.status);
        this.toastr.error('Please try again', 'Error !', { positionClass: 'toast-bottom-right' });
      });
  }

  clickAbleA() {
    this.router.navigate(['address']);
    return;
  }

  clickAbleB() {
    this.router.navigate(['rental-address']);
    return;
  }


  next() {
    this.router.navigate(['verify']);
    return;
  }

  showAndHideModal() {
    this.demoBasic.show();
  }
}
