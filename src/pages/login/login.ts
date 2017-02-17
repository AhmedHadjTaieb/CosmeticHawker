import { Component } from '@angular/core';
import { NavController , LoadingController,
  AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';

import { Page2 } from '../page2/page2';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { EmailValidator } from '../../validators/email';
import {AcceuilPage} from "../acceuil/acceuil";


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
loginForm: any;
emailChanged: boolean = false;
passwordChanged: boolean = false;
submitAttempt: boolean = false;
loading: any;
  constructor(public navCtrl: NavController, public authData: AuthData,
public formBuilder: FormBuilder, public alertCtrl: AlertController,
public loadingCtrl: LoadingController) {
  	this.loginForm = formBuilder.group({
email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
});

  }
  goToResetPassword(){
this.navCtrl.push(ResetPasswordPage);
}
elementChanged(input){
let field = input.inputControl.name;
this[field + "Changed"] = true;
}

ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

loginUser(){
  this.submitAttempt = true;

  if (!this.loginForm.valid){
    console.log(this.loginForm.value);
  } else {
    this.authData.loginUser(this.loginForm.value.email,
      this.loginForm.value.password).then( authData => {
        this.navCtrl.push(AcceuilPage);
      console.log(this.loginForm.value.email);
  }, error => {
    this.loading.dismiss().then( () => {
      let alert = this.alertCtrl.create({
        message: error.message,
        buttons: [
        {
          text: "Ok",
          role: 'cancel'
        }
        ]
  });
    alert.present();
  });
});

  this.loading = this.loadingCtrl.create({
    dismissOnPageChange: true,
  });
  this.loading.present();
  }
}

}
