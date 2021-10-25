import { Component, OnInit } from '@angular/core';
import {MovieService, SearchType} from '../../services/movie.service';
import {ActivatedRoute} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {Share} from '@capacitor/share';

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
  isFavor = false;

  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute, private toastCtrl: ToastController) { }

   ngOnInit() {
    this.isLoading = true;
    return this.activatedRoute.paramMap.subscribe((data) => {
      this.movieService.getDetails(data.get('id')).subscribe((detail) => {
        this.information = detail;
        this.isLoading = false;
      });
    });
  }

  openWebsite() {
    window.open(this.information.Website, '_blank');
  }

  async addFavorites() {
    const toast = await this.toastCtrl.create({
      message: 'با موفقیت به علاقمندی‌ها اضافه شد',
      duration: 1000
    });
    return this.movieService.addFavor(this.information).then((status) => {
      if (!status) {
        toast.present();
      }
    });
  }

  async share(data: MovieDetail) {
    await Share.share({
      text: data.Title,
      url: 'https://cafebazaar.ir/app/ir.malekzad.mohammad.moviebank'
    });

  }
}
