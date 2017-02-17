import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';



@Injectable()
export class AuthData {
  public email : String;
  public d :any;
	fireAuth: any;
constructor(public af: AngularFire) {
    this.d = new Date().toISOString();

  af.auth.subscribe( user => {
if (user) {
this.fireAuth = user.auth;
console.log(user);
}
});

}

loginUser(newEmail: string, newPassword: string): any {
  this.email=newEmail;
return this.af.auth.login({ email: newEmail, password: newPassword });
}

resetPassword(email: string): any {
return firebase.auth().sendPasswordResetEmail(email);
}

}
