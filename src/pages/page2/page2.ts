import { Component } from '@angular/core';
import { NavController,AlertController,NavParams } from 'ionic-angular';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import { AcceuilPage }from '../acceuil/acceuil';
import { AuthData } from '../../providers/auth-data';


    @Component({
      selector: 'page-page2',
      templateUrl: 'page2.html'
    })

    export class Page2 {
      public dataArr = [];

      employer:  FirebaseListObservable<any>;
      constructor(public navCtrl: NavController,public alertCtrl: AlertController,public angFire: AngularFire,public authData: AuthData ,public navParams:NavParams) {
console.log(this.authData.email);

        this.employer = this.angFire.database.list('employer', {
          query: {
            orderByChild: 'Mail',
            equalTo: this.authData.email
          }
        });
        this.employer.subscribe( rep => {
          rep.forEach(item => {
            this.employer.update(item.$key,{
              Connexion:this.authData.d.slice(0, 16)
            })
          });
        });
        console.log(this.employer);
        console.log(this.authData.d);

      }

      Modifier():void{
        let prompt=this.alertCtrl.create({
          title: 'Parameter',
          message: ' Modifier votre profil',
          inputs:[
            {
            name: 'Nom',
            placeholder: 'Nom'
          },
            {
              name: 'Prenom',
              placeholder: 'Prenom'
            },
            {
              name: 'Date de naissence',
              placeholder: 'Date de naissence'
            },
            {
              name: 'Photo de prof',
              placeholder: "Photo de prof"
            }
          ],
          buttons:[
            {
              text:"cancel",
              handler: data=>{
                console.log("cancel clicked");
              }
            },
            {
              text:"Save Book",
              handler: data=>{
                /*this.produits.push({
                  id:data.ID,
                  name:data.Name,
                  prix:data.Prix,
                  quantite:data.Quantite
                })*/
              }
            }
          ]
        });
        prompt.present();
      }

      openAcceuil() {
        this.navCtrl.setRoot(AcceuilPage);

      }

    }

