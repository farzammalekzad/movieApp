import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides} from '@ionic/angular';
import {Router} from '@angular/router';
import {Storage} from '@capacitor/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  @ViewChild('slide') slide: IonSlides;
  constructor(private router: Router) { }

   ngOnInit() {

  }

  next() {
    this.slide.slideNext().then(() => {
      console.log('next slide');
    });
  }

  async start() {
    const introseen = await Storage.set({key: 'intro-seen', value: 'true'});
    await this.router.navigateByUrl('/').then(() => {
      console.log('Intro seen');
    });

  }
}
