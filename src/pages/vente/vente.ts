import { Component } from '@angular/core';
import { NavController , AlertController} from 'ionic-angular';
import { BarcodeScanner}  from 'ionic-native';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import{ AuthData }from '../../providers/auth-data';
import { AcceuilPage }from '../acceuil/acceuil';
import { Toast } from 'ionic-native';
/*
  Generated class for the Vente page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-vente',
  templateUrl: 'vente.html'
})

export class VentePage {
  produits:  FirebaseListObservable<any>;
  ventes:  FirebaseListObservable<any>;
  public shouldHide:boolean;
  public shouldHidee:boolean;
  employer:  FirebaseListObservable<any>;

  barcodeData: BarcodeData;
   code : String = "";
   qts :number =1;
  public pdtsArr = [];
  public qteArrint = [];
  public qteArr = [];
   somme : number =0;

  constructor(public navCtrl: NavController , public alertCtrl: AlertController, public angFire: AngularFire,public authd : AuthData) {
    this.shouldHide = false;
    this.shouldHidee = false;


this.ventes=angFire.database.list('/ventes');

    let alert = this.alertCtrl.create({
        title: 'Scanne Code ',
        message: 'Appuier sur le bouton ci-dessous pour scanner le code a barre du produit',
        buttons: [{
          cssClass: 'buttoncss',
          text: 'Scanner',
          handler: () => {
            this.click();
          }

        }],
        cssClass: 'alertDanger'
      });
      alert.present();


  }
  scane(){
    let alert = this.alertCtrl.create({
      title: 'Scanne Code ',
      message: 'Appuier sur le bouton ci-dessous pour scanner le code a barre du produit',
      buttons: [{
        cssClass: 'buttoncss',
        text: 'Scanner',
        handler: () => {
          this.click();
        }

      }],
      cssClass: 'alertDanger'
    });
    alert.present();

  }
  remove(){
    if (this.qts == 0)
     this.qts = 0
    else
    this.qts = this.qts - 1;
  }
  add(){
    this.produits.subscribe( rep => {
      for(let x of rep)
      {  this.qteArrint.push(x.quantite);

      }

    });
    if (parseInt(this.qts.toString())< parseInt(this.qteArrint.toString())){
    this.qts = this.qts + 1;

  }
  }
  Commandez(){
    console.log(this.qteArr);

for(var y=0;y< this.pdtsArr.length;y++) {

  this.ventes.push({

    name: String(this.pdtsArr[y]),
    quantite: this.qteArr[y],
    utilisateur: this.authd.email
  });
}
    this.showToast('Commande Effectue ', 'center')


}

  showToast(message, position) {
    Toast.show(message, "short", position).subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  addtochart(){
    this.produits.subscribe( rep => {
      for(let x of rep)
      {
        this.pdtsArr.push(x.name);
        this.produits.update(x.$key,{
          id:x.id,
          name:x.name,
          prix:x.prix,
          quantite:(parseInt(x.quantite)-parseInt(this.qts.toString()))

        })
      }


    });
    this.qteArr.push(this.qts.toString());
    this.shouldHide = true;
    this.shouldHidee = true;
    this.showToast('Ajout dans le panier', 'center')
  }

  productid(code){
    this.produits = this.angFire.database.list('produits', {
      query: {
        orderByChild: 'id',
        equalTo: code
      }
    });
  }
  ionViewDidLoad() {
    console.log('Hello VentePage Page');
  }

  click() {
    //noinspection TypeScriptUnresolvedFunction
    BarcodeScanner.scan()
      .then((result) => {
        if (!result.cancelled) {
          this.barcodeData = new BarcodeData(result.text, result.format);
          this.code= this.barcodeData.text;
          this.productid(this.barcodeData.text);
        }
      })
      .catch((err) => {
        alert(err);
      })
  }
  openAcceuil() {
    this.navCtrl.setRoot(AcceuilPage);

  }

}
export class BarcodeData {
  constructor(
    public text: String,
    public format: String
  ) {}

}

