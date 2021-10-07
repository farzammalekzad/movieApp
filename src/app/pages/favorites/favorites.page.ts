import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {MovieDetail} from '../movie-details/movie-details.page';
import {AlertController, IonItemSliding, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favorites: MovieDetail[];
  constructor(private movieService: MovieService, private alertCtrl: AlertController, private toastCtrl: ToastController) { }

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
    const infoToast = await this.toastCtrl.create({
      message: 'تمام علاقمندی‌ها حذف شد',
      duration: 1000
    });
    const confirmAlert = await this.alertCtrl.create({
      header: 'حذف تمامی علاقمندی‌ها!',
      message: 'آیا اطمینان دارید؟',
      buttons: [{
        text: 'بله',
        handler: () => {
          return this.movieService.clearFavor().then(() => {
            infoToast.present();
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

    await confirmAlert.present();
  }

  async deleteFavor(id: string) {
    const toast = await this.toastCtrl.create({
      message: 'علاقمندی با موفقیت حذف شد',
      duration: 1500
    });
   this.movieService.removeFavorById(id).then(() => {
     toast.present();
     this.reloadData();
   });

  }

}
