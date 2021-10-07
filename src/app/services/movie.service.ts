import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {MovieDetail} from '../pages/movie-details/movie-details.page';
import {Storage} from '@capacitor/storage';

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
  FAVOR_KEY = 'favorites';

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

   getDetails(id): Observable<MovieDetail>  {
    return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
  }

  async getDetailsByStorage(id): Promise<MovieDetail> {
    const favorites = await this.getFavorAsArray();
    const filteredFavor = favorites.filter((fav) => {
      fav.imdbID = id;
    });
    return filteredFavor[0];
  }

  async addFavor(movieDetail: MovieDetail) {
    const status = await this.checkFavor(movieDetail.imdbID);
    console.log(status);
    if (!status) {
      const favorites = await this.getFavorAsArray();
      favorites.push(movieDetail);
      await Storage.set({key: this.FAVOR_KEY, value: JSON.stringify(favorites)});
      return status;
    }
    return status;

  }

  async clearFavor() {
    await Storage.remove({key: this.FAVOR_KEY});
  }

  getFavor(): Promise<MovieDetail[]> {
    return this.getFavorAsArray();
  }

  async checkFavor(id: string): Promise<boolean> {
    let status = false;
    await this.getFavorAsArray().then((favoritesArr) => {
      favoritesArr.filter((movie) => {
        if (movie.imdbID == id) {
          console.log('yes');
          status = true;
        }
      });
    });
     return status;
  }

   async removeFavorById(id: string) {
    let newFavorites = [];
    const favorites = await this.getFavorAsArray();
    newFavorites = favorites.filter((x) => x.imdbID != id);
    return await Storage.set({key: this.FAVOR_KEY, value: JSON.stringify(newFavorites)});
  }


  private async getFavorAsArray(): Promise<MovieDetail[]> {
    const favorites = await Storage.get({key: this.FAVOR_KEY});
    let favoritesArr = [];
    if (favorites.value) {
      favoritesArr = JSON.parse(favorites.value);
      return favoritesArr;
    }
    return [];
  }


}
