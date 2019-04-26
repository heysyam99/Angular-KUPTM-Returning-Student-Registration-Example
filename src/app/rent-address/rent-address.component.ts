import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Importing API
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rent-address',
  templateUrl: './rent-address.component.html',
  styleUrls: ['./rent-address.component.css']
})

export class RentAddressComponent implements OnInit {

  studentForm: FormGroup;

  ngOnInit() {
    this.studentForm = this.fb.group({
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      postcode: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required]
    });

    this.crudService.getStudentAddress2().subscribe((response: any) => {
      this.studentForm.patchValue(response.data);
    });
  }

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private toastr: ToastrService) {

    this.studentForm = this.fb.group({
      address1: ['', Validators.compose([Validators.required])],
      address2: ['', Validators.compose([Validators.required])],
      postcode: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
    });
  }

  saveStudentDetails(values) {

    const studentData = {};

    studentData['address1'] = values.address1;
    studentData['address2'] = values.address2;
    studentData['postcode'] = values.postcode;
    studentData['city'] = values.city;
    studentData['state'] = values.state;
    studentData['country'] = values.country;

    this.crudService.updateRentalAddress(studentData).subscribe(result => {
      // this.student = result;
      this.toastr.success('Your data has been inserted', 'Success !', { positionClass: 'toast-bottom-right' });
      console.log(this.crudService.getToken());
      this.router.navigate(['/finance']);
    },
      err => {
        console.log('status code ->' + err.status);
        this.toastr.error('Please try again', 'Error !', { positionClass: 'toast-bottom-right' });
      });
  }

  clickAbleA() {
    this.router.navigate(['address']);
    return;
  }

  clickAbleB() {
    this.router.navigate(['permenant-address']);
    return;
  }
}
