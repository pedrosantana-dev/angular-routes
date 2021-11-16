import { BehaviorSubject, Observable, timer } from 'rxjs';
import { Electronic } from './../models/electronic';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ElectronicService {

  private electronicSubject$: BehaviorSubject<Electronic[]> = new BehaviorSubject<Electronic[]>([]);
  public electronics$ = this.electronicSubject$.asObservable();

  constructor() {
    timer(1000)
    .subscribe(()=>{
      this.electronicSubject$.next([
        { name: "Headphone", brand: "Bose", price: 200, description: "Noise canseling"},
        { name: "Portable HD", brand: "Samsung", price: 100, description: "Noise canseling"},
        { name: "Monitor 23\"", brand: "AOC", price: 200, description: "Noise canseling"},
        { name: "Processor i7-8700K", brand: "Intel", price: 400, description: "Noise canseling"},
        { name: "Mouse wireless", brand: "Logitech", price: 50, description: "Noise canseling"},
      ])
    })
  }

  get(i: number): Observable<Electronic| null> {
    return this.electronics$.pipe(
      map(electronics => (i >= 0 && i < electronics.length) ? electronics[i] : null),
      delay(1000)
    )
  }
}
