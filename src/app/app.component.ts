import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AngularFire } from 'angularfire2';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { VentePage } from '../pages/vente/vente';
import {LoginPage} from '../pages/login/login';
import {AcceuilPage} from '../pages/acceuil/acceuil';
import {MapsPage} from '../pages/maps/maps';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = Page1;
rootPage: any ;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform ,  public af: AngularFire) {

    af.auth.subscribe( user => {
  if (user) {
    this.rootPage = AcceuilPage;

  } else {
    this.rootPage = LoginPage;
  }
});

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Acceuil', component: AcceuilPage },
      { title: 'Tableau de bord', component: Page1 },
      { title: 'Vente', component: VentePage },
      { title: 'Profil', component: Page2 },
      { title: 'Plans', component: MapsPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logoutUser(): any {
    return this.af.auth.logout();
  }
}
