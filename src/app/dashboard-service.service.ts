// import { Injectable } from '@angular/core';
// import { User } from "./models/user-model";
// import { Observable } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { HttpClient, HttpErrorResponse,HttpHeaders  } from '@angular/common/http';
// import { throwError } from 'rxjs';
// import { map } from 'rxjs/operators';




// @Injectable({
//   providedIn: 'root'
// })


// export class DashboardServiceService {

// //private base_url: string = "http://192.168.0.38:4000";
// private  listEmployees: User[] = [


//     {
//       id: 1,
//       name: 'Jhon',
//       username:'aaa@gmail.com',
//       phoneNumber: 2345978640,
//       password:'asshhh',
//       displayButtons: false
     
//     },
//     {
//       id: 2,
//       name: 'mary',
//       username:'sss@gmail.com',
//        phoneNumber: 2345978640,
//        password:'asshhh',
//        displayButtons: false
     
//     },
//     {
//       id:3,
//       name: 'mark',
//       username:'mmm@gmail.com',
//       phoneNumber: 2345978640,
//       password:'asshhh',
//       displayButtons: false
     
//     },
//   ];

 
//   constructor(private httpClient :HttpClient) { }

//   getUsers(): User[] {
//     return this.listEmployees;
//   }


//   // getEmployees(): Observable<User[]> {
//   //   return this.httpClient.get<User[]>(this.base_url)
//   //   .pipe(catchError(this.handleError));
//   //   }



//   //   private handleError(errorResponse: HttpErrorResponse) {
//   //     if (errorResponse.error instanceof ErrorEvent) {
//   //         console.error('Client Side Error :', errorResponse.error.message);
//   //     } else {
//   //         console.error('Server Side Error :', errorResponse);
//   //     }
//   //     return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
//   // }

//   // deleteEmployee(id: number): Observable<void> {
//   //   return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
//   //       .pipe(catchError(this.handleError));
//   // }
// }
