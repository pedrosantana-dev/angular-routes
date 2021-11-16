import { DvdService } from './../services/dvd.service';
import { Dvd } from './../models/dvd';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dvd',
  templateUrl: './dvd.component.html',
  styleUrls: ['./dvd.component.css']
})
export class DvdComponent implements OnInit {

  dvds$: Observable<Dvd[]>;

  constructor(
    private dvdServices: DvdService,
    private router: Router) {
    this.dvds$ = this.dvdServices.dvds$;
  }

  ngOnInit(): void {
  }

  goDetails(i: number, dvd: Dvd) {
    this.router.navigate([`/dvds/${i}`, { title: dvd.title }])
  }

  remove(i: number) {
    this.dvdServices.remove(i);
  }

}
