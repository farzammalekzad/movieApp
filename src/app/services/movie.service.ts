import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';

export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  game = 'game'
}

export interface Results {
  Poster: string;
  Title: string;
  Type: SearchType;
  imdbID: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  url = 'http://www.omdbapi.com/';
  apiKey = '212207a5';

  // @ts-ignore
  searchResults = new BehaviorSubject<Results>([]);

  constructor(private http: HttpClient) { }

  getAllSearchResults() {
    return this.searchResults.asObservable();
  }

  searchData(title: string, type: SearchType): Observable<any> {
    return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`)
      .pipe(map(res => this.searchResults.next(res['Search'])));
  }

  getDetails(id)  {
    return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
  }

}
