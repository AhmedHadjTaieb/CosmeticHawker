import { Component ,ViewChild} from '@angular/core';
import { Nav , NavController,ViewController } from 'ionic-angular';
import { Page1 }from '../page1/page1';
import { Page2 }from '../page2/page2';
import { VentePage }from '../vente/vente';
import { MapsPage }from '../maps/maps';
import { AngularFire } from 'angularfire2';

/*
  Generated class for the Acceuil page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-acceuil',
  templateUrl: 'acceuil.html'
})
export class AcceuilPage {
  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController,public view: ViewController,public af: AngularFire) {
    this.pages = [
      { title: 'Chart Graphique', component: Page1 },
      { title: 'Vente', component: VentePage },
      { title: 'Profil', component: Page2 }
    ];

  }

  openPageProfil() {
  this.navCtrl.setRoot(Page2);
  this.view.showBackButton(false);

}
  openPagevente() {
    this.navCtrl.setRoot(VentePage);

  }
  openPagePlan() {
    this.navCtrl.setRoot(MapsPage);
    this.view.showBackButton(false);

  }
  openPagetableau() {
    this.navCtrl.setRoot(Page1);
    this.view.showBackButton(false);

  }
  logoutUser(): any {
    return this.af.auth.logout();
  }



}
