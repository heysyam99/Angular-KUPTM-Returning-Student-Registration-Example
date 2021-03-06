import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Importing API
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit {

  studentForm: FormGroup;

  ngOnInit() {
    this.studentForm = this.fb.group({
      phone: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      postcode: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required]
    });

    this.crudService.getStudentAddress1().subscribe((response: any) => {
      this.studentForm.patchValue(response.data);
    });

    if (this.studentForm.invalid) {
      console.log('good');
      sessionStorage.removeItem('address');
    }

    if (this.studentForm.valid) {
      console.log('bad');
      sessionStorage.setItem('address', 'COMPLETED');
    }
  }

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private toastr: ToastrService) {

    this.studentForm = this.fb.group({
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(12)])],
      address1: ['', Validators.compose([Validators.required])],
      address2: ['', Validators.compose([Validators.required])],
      postcode: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])],
      state: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])]
    });
  }

  saveStudentDetails(values) {

    const studentData = { };

    studentData['phone'] = values.phone;
    studentData['address1'] = values.address1;
    studentData['address2'] = values.address2;
    studentData['postcode'] = values.postcode;
    studentData['city'] = values.city;
    studentData['state'] = values.state;
    studentData['country'] = values.country;

    this.crudService.updatePermaAddress(studentData).subscribe(result => {
      this.toastr.success('Your data has been inserted', 'Success !', { positionClass: 'toast-bottom-right' });
      console.log(this.crudService.getToken());
      this.router.navigate(['/rental-address']);
    },
      err => {
        console.log('status code ->' + err.status);
        this.toastr.error('Please try again', 'Error !', { positionClass: 'toast-bottom-right' });
      });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);

    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  clickAbleA() {
    this.router.navigate(['address']);
    return;
  }
}
