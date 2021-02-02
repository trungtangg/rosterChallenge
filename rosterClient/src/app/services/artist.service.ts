import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtistService{
  constructor(private http: HttpClient) {
  }

  getArtists = (currentPage: number, limit: number, sort: string, filter?: any[]) => {
    let params = new HttpParams();
    if (filter) {
      params = params.append('filter', JSON.stringify(filter));
    }
    params = params.append('page', currentPage.toString());
    params = params.append('limit', limit.toString());
    params = params.append('sort', sort);
    return this.http.get(`${environment.rosterAPI}artists`, { params });
  }

  updateArtists = (artist: any) => {
    return this.http.patch(`${environment.rosterAPI}artists`, { _id: artist._id, isPaid: artist.isPaid });
  }
}
