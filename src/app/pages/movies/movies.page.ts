import { Component, OnInit } from '@angular/core';
import {MovieService, Results} from '../../services/movie.service';
import {Observable} from 'rxjs';
import {SearchType} from '../../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  results: Results;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getAllSearchResults().subscribe(res => {
      this.results = res;
    });
  }


}
