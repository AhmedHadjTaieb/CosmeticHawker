import { NgModule , ErrorHandler} from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Connectivity } from '../providers/connectivity';
import { Page1 } from '../pages/page1/page1';
import { ListPage } from '../pages/list/list';
import { MapPage } from '../pages/map/map';
import { Page2 } from '../pages/page2/page2';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { VentePage } from '../pages/vente/vente';
import { AcceuilPage } from '../pages/acceuil/acceuil';
import { GoogleMaps } from '../providers/google-maps';
import { GoogleMapsCluster } from '../providers/google-maps-cluster';
import {Locations } from '../providers/locations'
import '../../node_modules/chart.js/dist/Chart.min.js';
// Importing providers
import { AuthData } from '../providers/auth-data';

// Import the AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import {MapsPage} from "../pages/maps/maps";

// AF2 Settings
var firebaseConfig = {
  apiKey: "AIzaSyAEb1OrV6lRp1r--Ap2czbKBPcZLs08yyE",
  authDomain: "cosmetichawker-35c89.firebaseapp.com",
  databaseURL: "https://cosmetichawker-35c89.firebaseio.com",
  storageBucket: "cosmetichawker-35c89.appspot.com",
  messagingSenderId: "963241047741"
};

const myFirebaseAuthConfig = {
provider: AuthProviders.Password,
method: AuthMethods.Password
}

@NgModule({
declarations: [
MyApp,
Page1,
Page2,
LoginPage,
ResetPasswordPage,
  VentePage,
  AcceuilPage,
  MapsPage,
  MapPage,
  ListPage
],
imports: [
IonicModule.forRoot(MyApp),
AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
],
bootstrap: [IonicApp],
entryComponents: [
MyApp,
Page1,
Page2,
LoginPage,
ResetPasswordPage,
  VentePage,
  AcceuilPage,
  MapsPage,
  MapPage,
  ListPage
],
providers: [
AuthData,{provide: ErrorHandler, useClass: IonicErrorHandler}, GoogleMaps, GoogleMapsCluster, Connectivity ,Locations
]
})
export class AppModule {}
