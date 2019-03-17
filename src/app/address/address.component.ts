import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Importing API
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Student } from '../student';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
// For FYP Project

 // export class AddressComponent implements OnInit {
  export class AddressComponent {

  studentForm: FormGroup;
  student: Student;



  // ngOnInit() {
  //   this.getStudentDetails = this.actRoute.snapshot.params['id'];

  //   this.studentForm = this.fb.group({
  //     // s_pNumber: ['', Validators.compose([Validators.required])],
  //     // s_address: ['', Validators.compose([Validators.required])],
  //     // s_pCode: ['', Validators.compose([Validators.required])],
  //     // s_city: ['', Validators.compose([Validators.required])],
  //     // s_state: ['', Validators.compose([Validators.required])],
  //     // s_country: ['', Validators.compose([Validators.required])],

  //     s_pNumber: [null, Validators.required],
  //     s_address: [null, Validators.required],
  //     s_pCode: [null, Validators.required],
  //     s_city: [null, Validators.required],
  //     s_state: [null, Validators.required],
  //     s_country: [null, Validators.required]
  //   });
  // }

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private toastr: ToastrService) {

          this.studentForm = this.fb.group({
      s_pNumber: ['', Validators.compose([Validators.required])],
      s_address: ['', Validators.compose([Validators.required])],
      s_pCode: ['', Validators.compose([Validators.required])],
      s_city: ['', Validators.compose([Validators.required])],
      s_state: ['', Validators.compose([Validators.required])],
      s_country: ['', Validators.compose([Validators.required])],

          });
    }

    saveStudentDetails(values) {
      // const studentData = new FormData();
      const studentData = {};

      // studentData.append('s_pNumber', values.s_pNumber);
      // studentData.append('s_address', values.s_address);
      // studentData.append('s_pCode', values.s_pCode);
      // studentData.append('s_city', values.s_city);
      // studentData.append('s_state', values.s_state);
      // studentData.append('s_country', values.s_country);

      studentData['s_pNumber'] =  values.s_pNumber;
      studentData['s_address'] =  values.s_address;
      studentData['s_pCode'] =  values.s_pCode;
      studentData['s_city'] =  values.s_city;
      studentData['s_state'] =  values.s_state;
      studentData['s_country'] =  values.s_country;

      this.crudService.createAddress(studentData).subscribe(result => {
        // this.student = result;
        this.toastr.success('Your data has been inserted', 'Success !', { positionClass: 'toast-bottom-right' });
        // this.router.navigate(['/finance']);
      },
        err => {
          console.log('status code ->' + err.status);
          this.toastr.error('Please try again', 'Error !', { positionClass: 'toast-bottom-right' });
    });
  }

    // getStudentDetails(id) {
    //   this.crudService.getStudentDetails(id).subscribe(data => {
    //     this._id = data._id;
    //     this.studentForm.setValue({
    //       s_pNumber: data.s_pNumber,
    //       s_address: data.s_address,
    //       s_pCode: data.s_pCode,
    //       s_city: data.s_city,
    //       s_state: data.s_state,
    //       s_country: data.s_country
    //     });
    //   });
    // }

    // onFormSubmit(form: NgForm) {
    //   this.isLoadingResults = true;
    //   this.crudService.updateStudent(this._id, new Student)
    //     .subscribe(res => {
    //       let id = res['id'];
    //       this.isLoadingResults = false;
    //       this.toastr.success('Your data has been inserted', 'Success !', { positionClass: 'toast-bottom-right' });
    //     }, err => {
    //       console.log(err);
    //       this.toastr.error('Please try again', 'Error !', { positionClass: 'toast-bottom-right' });
    //       this.isLoadingResults = false;
    //     }
    //   );
    // }



    keyPress(event: any) {
      const pattern = /[0-9\+\-\ ]/;

      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
}
