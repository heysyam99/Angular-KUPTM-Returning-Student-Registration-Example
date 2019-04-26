import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, private crudService: CrudService, private toastr: ToastrService) { }
  completion_1;
  completion_2;
  studentDetailForm: FormGroup;
  studentRecordForm: FormGroup;
  studentwelfareForm: FormGroup;
  studentfinanceForm: FormGroup;

  ngOnInit() {
    this.studentDetailForm = this.fb.group({
      name: [''],
      id: [''],
      ic: [''],
      prgcode: ['']
    });

    this.studentRecordForm = this.fb.group({
      completion: ['']
    });

    this.studentwelfareForm = this.fb.group({
      completion: ['']
    });

    this.studentfinanceForm = this.fb.group({
      refNumber: [''],
      amount: [''],
      datePaid: ['']
    });

    this.crudService.getStudentDetail().subscribe((response: any) => {
      this.studentDetailForm.patchValue(response);
    });

    this.crudService.getStudentAddress1().subscribe((response: any) => {
      const check_1 = response.data.address1;
      const check_2 = response.data.address2;
      const check_3 = response.data.phone;
      const check_4 = response.data.postcode;
      const check_5 = response.data.city;
      const check_6 = response.data.state;
      const check_7 = response.data.country;

      if (check_1 !== '' && check_3 !== '' && check_4 !== '' && check_5 !== '' && check_6 !== '' && check_7 !== '') {
        this.completion_1 = 'LENGKAP';
      } else {
        this.completion_1 = 'TIDAK LENGKAP';
      }
    });

    this.crudService.getStudentAddress2().subscribe((response: any) => {
      const check_1 = response.data.address1;
      const check_2 = response.data.address2;
      const check_3 = response.data.postcode;
      const check_4 = response.data.city;
      const check_5 = response.data.state;
      const check_6 = response.data.country;

      if (check_1 !== '' && check_3 !== '' && check_4 !== '' && check_5 !== '' && check_6 !== '') {
        this.completion_2 = 'LENGKAP';
      } else {
        this.completion_2 = 'TIDAK LENGKAP';
      }
    });

    this.crudService.getStudentFinance().subscribe((response: any) => {
      this.studentfinanceForm.patchValue(response.data);
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

  clickAbleC() {
    this.router.navigate(['finance']);
    return;

  }

  captureScreen() {
    const data = document.getElementById('convert');
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('Test.pdf');
    });
  }

  logout() {
    this.router.navigate(['login']);
    this.toastr.success('Your have successful logout', 'Success !', { positionClass: 'toast-bottom-right' });
  }
}
