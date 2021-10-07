import {Component, OnInit} from '@angular/core';
import {MovieService, Results, SearchType} from '../../services/movie.service';
import {LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  results: Results;
  searchWord = '';
  type: SearchType = SearchType.movie;

  constructor(private movieService: MovieService, private loadingCtrl: LoadingController, private router: Router) { }

  ngOnInit() {

  }

  async searching() {
    const loading = await this.loadingCtrl.create({
      message: 'در حال بررسی'
    });
    await loading.present();
    this.movieService.searchData(this.searchWord, this.type).subscribe((res) => {
      loading.dismiss();
      this.router.navigateByUrl('/movies');
    });



  }

  getLastResult() {
    this.router.navigateByUrl('/movies');
  }

}
