import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

import { SignInPage } from '../signin/signin';



@IonicPage()
@Component({
  selector: 'page-other',
  templateUrl: 'other.html',
})
export class OtherPage {

  constructor( public navCtrl: NavController,
    public authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherPage');
  }

  

}
