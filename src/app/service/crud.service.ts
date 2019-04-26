import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // Base api url
  public url = 'http://localhost:8080';

  constructor(private http: HttpClient, private route: Router) { }

  loginStudent(data) {

    const postHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    postHttpOptions['observe'] = 'response';

    return this.http.post(this.url + '/student/login', data, postHttpOptions)
      .pipe(map((response: any) => {

        // if(response && response.headers.ok){
        sessionStorage.setItem('userId', response.body.id);
        sessionStorage.setItem('ic', response.body.ic);
        sessionStorage.setItem('token', response.body.token);
        sessionStorage.setItem('image', response.body.image);
        // }

        return response;
      }));

  }

  updatePermaAddress(data) {

    const postHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      })
    };

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', sessionStorage.getItem('token'));

    postHttpOptions['observe'] = 'response';

    const id = sessionStorage.getItem('userId');

    return this.http.put('http://localhost:8080/student/address/permaddress/' + id, data, postHttpOptions);
  }

  updateRentalAddress(data) {

    const postHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      })
    };

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', sessionStorage.getItem('token'));

    postHttpOptions['observe'] = 'response';

    const id = sessionStorage.getItem('userId');

    return this.http.put('http://localhost:8080/student/address/rentaddress/' + id, data, postHttpOptions);
  }

  getStudentDetail() {
    const id = sessionStorage.getItem('userId');

    return this.http.get('http://localhost:8080' + '/student/studentdetail/' + id);
  }

  getStudentAddress1() {

    const id = sessionStorage.getItem('userId');

    return this.http.get('http://localhost:8080' + '/student/address/permaddress/' + id);
  }

  getStudentAddress2() {

    const id = sessionStorage.getItem('userId');

    return this.http.get('http://localhost:8080' + '/student/address/rentaladdress/' + id);
  }

  getStudentFinance() {
    const id = sessionStorage.getItem('userId');

    return this.http.get('http://localhost:8080' + '/student/finance/' + id);
  }

  updateStudentFinance(data) {
    const postHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      })
    };

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', sessionStorage.getItem('token'));

    postHttpOptions['observe'] = 'response';

    const id = sessionStorage.getItem('userId');

    return this.http.put('http://localhost:8080/student/finance/' + id, data, postHttpOptions);


  }

  postImage(fileToUpload: File) {
    const id = sessionStorage.getItem('userId');
    const formData: FormData = new FormData();
    formData.append('filename', fileToUpload, fileToUpload.name);
    return this.http.post('http://localhost:8080' + '/student/finance/upload/' + id, formData);
  }

  sendToken(token: string) {
    sessionStorage.setItem('LoggedInUser', token);
  }

  getToken() {
    return sessionStorage.getItem('LoggedInUser');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    sessionStorage.clear();
  }

  private handleErrorStudent(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    // tslint:disable-next-line: deprecation
    return Observable.throw(errMsg);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
