import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  id: string;
  information = null;

  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((data) => {
      return  this.movieService.getDetails(data.get('id')).subscribe(info => {
         this.information = info;
       });
    });
  }

  openWebsite() {
    window.open(this.information.Website, '_blank');
  }

}
