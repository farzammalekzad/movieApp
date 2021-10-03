import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {Storage} from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor( private router: Router) {
  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Promise<boolean> {

    const introseen = await Storage.get({key: 'intro-seen'});
    if (JSON.parse(introseen.value) !== true) {
      console.log('mmm');
      return this.router.navigateByUrl('/intro');
    }
    return true;

  }

}
