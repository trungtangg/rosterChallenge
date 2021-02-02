import { Component } from '@angular/core';
import { ArtistService } from './services/artist.service';
import { Artist } from './models'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  currentPage: number;
  totalPages: number;
  limit: number;
  sortOrder: string;
  artists: Artist[];
  isInfiniteScroll: boolean;
  isDescending: boolean;
  selectedField: string;
  searchTerm: string;

  constructor(private artistService: ArtistService) {
    this.reset();
    this.getArtists(1);
  }

  /**
   * Reset fields when toggling infinite scroll
   */
  reset() {
    this.currentPage = 0;
    this.limit = 10;
    this.sortOrder = 'artist';
    this.artists = [];
    this.isDescending = false;
    this.selectedField = 'artist';
    this.searchTerm = '';
  }

  /**
   * Get artists when toggling infinite scroll
   */
  getNewList() {
    let height = document.getElementById('scrollTable')?.offsetHeight;
    if (this.isInfiniteScroll) {
      if (height! < window.innerHeight + window.scrollY) {
        setTimeout(() => {
          this.onScrollDown();
          this.getNewList();
        }, 250);
      }
    } else {
      this.getArtists(1);
    }
  }
  
  /**
   * Get list of artists upon initial load
   * @param page Page to load
   */
  getArtists(page: number) {
    this.artistService.getArtists(page, this.limit, this.sortOrder).subscribe((response: any) => {
      let limiters = response.footer;
      this.currentPage = limiters.page;
      this.totalPages = limiters.totalPages;
      this.artists = this.calculatePayout(response.list);
    });
  }

  /**
   * Load artists when scrolling to bottom; Concatenate the list with existing artists
   */
  onScrollDown() {
    if (this.totalPages !== this.currentPage) {
      this.artistService.getArtists(++this.currentPage, this.limit, this.sortOrder).subscribe((response: any) => {
        let limiters = response.footer;
        this.currentPage = limiters.page;
        this.totalPages = limiters.totalPages;
        this.artists = this.artists.concat(this.calculatePayout(response.list));
      });
    }
  }

  /**
   * Navigate to prev page
   */
  prevPage() {
    this.getArtists(--this.currentPage);
  }

  /**
   * Navigate to next page
   */
  nextPage() {
    this.getArtists(++this.currentPage);
  }

  /**
   * Sorting by column header.
   * @param column column that is to be sorted by.
   */
  setSort(column: string) {
    this.searchTerm = '';
    this.selectedField = column;
    if (column === this.sortOrder) {
      column = `-${column}`;
      this.isDescending = true;
    } else {
      this.isDescending = false;
    }
    this.sortOrder = column;
    if (this.isInfiniteScroll) {
      this.currentPage = 0;
      this.artists = [];
      setTimeout(() => {
        this.getNewList();
      }, 250);
    } else {
      this.getArtists(1);
    }
  }

  /**
   * Calculate payout based on rate * stream volume
   * @param artists array to calculate payout for each record.
   */
  calculatePayout(artists: Artist[]) {
    artists.forEach(artist => {
      artist.payout = artist.rate * artist.streams;
    });
    return artists;
  }

  /**
   * Update record with payout toggle 
   * @param artist 
   */
  setPaid(artist: Artist) {
    this.artistService.updateArtists(artist).subscribe();
  }

  /**
   * Search for a specific artist
   * @param event 
   */
  searchArtists(event: string) {
    this.reset();
    let filters = [];
    if (event) {
      this.searchTerm = event;
      filters.push({ key: 'artist', value: event, type: 'regex' });
    }
    this.artistService.getArtists(++this.currentPage, this.limit, this.sortOrder, filters).subscribe((response: any) => {
      let limiters = response.footer;
      this.currentPage = limiters.page;
      this.totalPages = limiters.totalPages;
      this.artists = this.calculatePayout(response.list);
    });
  }
}
