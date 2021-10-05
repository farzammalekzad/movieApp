import { Component, OnInit } from '@angular/core';
import {MovieService, SearchType} from '../../services/movie.service';
import {ActivatedRoute} from '@angular/router';

export interface Ratings {
  Source: string;
  Value: string;
}
export interface MovieDetail {
  Actors?: string;
  Awards?: string;
  BoxOffice?: string;
  Country?: string;
  Director?: string;
  Genre?: string;
  Language?: string;
  Metascore?: string;
  Plot?: string;
  Poster?: string;
  Production?: string;
  Rated?: string;
  Ratings?: Ratings[];
  Released?: string;
  Runtime?: string;
  Title?: string;
  DVD?: string;
  Type?: SearchType;
  Website?: string;
  Writer?: string;
  Year?: string;
  imdbID?: string;
  imdbRating?: string;
  imdbVotes?: string;
}

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})

export class MovieDetailsPage implements OnInit {
  isLoading = false;
  id: string;
  information: MovieDetail;

  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe((data) => {
      return this.movieService.getDetails(data.get('id')).subscribe((info) => {
        console.log(info);
        this.isLoading = false;
         this.information = info;
       });
    });
  }

  openWebsite() {
    window.open(this.information.Website, '_blank');
  }

}
