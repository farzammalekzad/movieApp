import {Component, Inject} from '@angular/core';
import {AlertController, Platform} from '@ionic/angular';
import {Capacitor} from '@capacitor/core';
import {DOCUMENT} from '@angular/common';
import {SplashScreen} from '@capacitor/splash-screen';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(@Inject(DOCUMENT) private document: Document,
              private alertCtrl: AlertController,
              public platform: Platform) {
    this.document.documentElement.dir = 'rtl';
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        SplashScreen.hide();
      }
    });
  }
}
