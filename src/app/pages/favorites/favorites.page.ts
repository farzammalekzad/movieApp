import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {MovieDetail} from '../movie-details/movie-details.page';
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favorites: MovieDetail[];
  constructor(private movieService: MovieService, private alertCtrl: AlertController) { }

  async ngOnInit() {
    await this.movieService.getFavor().then((favor) => {
      this.favorites = favor;
    });
  }

  async reloadData() {
    await this.movieService.getFavor().then((favor) => {
      this.favorites = favor;
    });
  }

  async removeAll() {
    const infoAlert = await this.alertCtrl.create({
      message: 'تمامی علاقمندی‌ها حذف شد',
      buttons: ['باشه']
    });
    const confirmAlert = await this.alertCtrl.create({
      header: 'حذف تمامی علاقمندی‌ها',
      message: 'آیا اطمینان دارید؟',
      buttons: [{
        text: 'باشه',
        handler: () => {
          return this.movieService.clearFavor().then(() => {
            infoAlert.present();
            this.reloadData();
          });
        }
      },{
        text: 'خیر',
        role: 'Cancel',
        handler: () => {
          console.log('Canceled');
        }
      }]
    });

    confirmAlert.present();
  }

}
