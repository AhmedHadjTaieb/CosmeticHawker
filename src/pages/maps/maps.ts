import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { MapPage } from '../map/map';
import { AcceuilPage } from '../acceuil/acceuil';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})
export class MapsPage {

  tab1Root: any = MapPage;
  tab2Root: any = ListPage;

  constructor(public navCtrl:NavController ){

  }


  openAcceuil() {
    this.navCtrl.setRoot(AcceuilPage);

  }
}
