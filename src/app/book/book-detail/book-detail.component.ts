import { Book } from './../../models/book';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book$: Observable<Book>;
  index!: number;
  authors!: string[];

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router) {

    /* let i: number = +this.route.snapshot.paramMap.get('index')!;
    this.book$ = bookService.get(i) as Observable<Book>; */

    this.book$ = this.route.paramMap
      .pipe(
        tap((params: ParamMap) => this.index = +params.get('index')!),
        switchMap((params: ParamMap) => (this.bookService.get(+params.get('index')!) as Observable<Book>)),
        tap((b) => this.authors = (b) ? b.authors : [])
      ) as Observable<Book>;
    /* .subscribe((params: ParamMap)=>{
      console.log('Index: ', params.get('index'));
    }) */

  }

  ngOnInit(): void {
  }

  goAuthors() {
    let url = '/books/' + this.index + '/authors';
    this.router.navigate([url, { authors: this.authors }]);
  }

  remove() {
    this.bookService.remove(this.index);
    this.router.navigateByUrl('/books')
  }

}
