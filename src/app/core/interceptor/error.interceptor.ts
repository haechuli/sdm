import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(err => {
      console.error('HTTP Error:', err);
      alert('에러 발생: ' + err.message);
      return throwError(() => err);
    })
  );
};
