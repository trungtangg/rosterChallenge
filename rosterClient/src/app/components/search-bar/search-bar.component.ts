import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchbarComponent implements OnInit{
  @Input() term: string;
  @Output() search = new EventEmitter();
  searchTerm$: Subject<string>;

  constructor() {
    this.searchTerm$ = new Subject<string>();
  }

  ngOnInit() {
    this.searchTerm$.pipe(
      debounceTime(250),
      distinctUntilChanged()).subscribe(res => this.search.emit(res));
  }

  searchArtists() {
    this.searchTerm$.next(this.term);
  }
}
