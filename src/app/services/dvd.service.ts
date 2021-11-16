import { Dvd } from './../models/dvd';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DvdService {

  private dvdSubject$: BehaviorSubject<Dvd[]> = new BehaviorSubject<Dvd[]>([]);
  public dvds$ = this.dvdSubject$.asObservable();


  constructor() {
    timer(2000)
      .subscribe(() => {
        this.dvdSubject$.next([
          { title: "DVD - Beegees", year: 2016, genre: "Music" },
          { title: "The wind", year: 2018, genre: "Movie" }
        ])
      })
  }

  add(b: Dvd) {
    this.dvdSubject$.getValue()
      .push(b);
  }
  remove(i: number) {
    let dvds = this.dvdSubject$.getValue();
    if (i >= 0 && i < dvds.length)
      dvds.splice(i, 1);
  }
  get(i: number): Observable<Dvd| null> {
    return this.dvds$.pipe(
      map(dvds => (i >= 0 && i < dvds.length) ? dvds[i] : null),
      delay(1000)
    )
  }
}
