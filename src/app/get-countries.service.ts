import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GetCountriesService {
  constructor() {}

  getCountries(): Observable<any[]> {
    return fromFetch('https://restcountries.com/v3.1/all').pipe(
      switchMap((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error(`Error ${response.status}`);
          return of([]);
        }
      }),
      catchError((err) => {
        console.error('Fetch error:', err);
        return of([]);
      })
    );
  }
}
