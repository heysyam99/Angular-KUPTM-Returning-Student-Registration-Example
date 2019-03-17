import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Student } from '../student';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // Base api url
  public url = 'http://localhost:8080';
  headerProperty: string;

  constructor(private http: HttpClient) { }


  // FOR TESTING

  createAddress(data) {

    const postHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
  };

    postHttpOptions['observe'] = 'response';

    return this.http.put(this.url + '/address/${id}', data);
    // .pipe(map(response => {
    //        return response;
    //   }));
  }


  // LOGIN STUDENT

  loginstudent(data) {

    const postHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
  };

  postHttpOptions['observe'] = 'response';

  return this.http.post(this.url + '/login', data, postHttpOptions)
  .pipe(map(response => {
         return response;
    }));

  }

  // // TEST 2

  // updateStudent(student: Student) {
  //   return this.http.put(this.url + '/' + student.id, student);
  // }

  // getUserById(id: number) {
  //   return this.http.get<Student>(this.url + '/todo/' + id);
  // }

  // TEST 1

  // // GET STUDENT DETAILS BASED ON THEIR ID

  // getStudentDetails(id: number): Observable<Student> {
  //   const url = this.url + '/todo' + '/${id}';
  //   return this.http.get<Student>(url).pipe(
  //     // tap(_ => console.log('fetched student id=${id}')),
  //     catchError(this.handleError<Student>('getStudent id=${id}'))
  //   );
  // }

  // // TO UPDATE STUDENT DETAILS IN DATABASE

  // updateStudent(id, data: Student): Observable<Student> {

  //   const postHttpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json'
  //     })
  // };

  //   const url = this.url + '/address/${id}';
  //   return this.http.put(url, data, postHttpOptions).pipe(
  //     // tap(_ => console.log('Updated student id=${id}')),
  //     catchError(this.handleError<any>('updateStudent'))
  //   );
  // }


  private handleErrorStudent (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
