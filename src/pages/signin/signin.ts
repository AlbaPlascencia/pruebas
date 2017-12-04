import { Component, NgZone } from '@angular/core';
import { NavController, LoadingController,NavParams, AlertController,  ActionSheetController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';

import { Storage } from '@ionic/storage';

import { UserModel } from '../../models/user-model';

import { SignUpPage } from '../signup/signup';
import { HomePage } from '../home/home';
import {OtherPage} from "../other/other"

import { Facebook } from '@ionic-native/facebook'

import firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { ModalController } from 'ionic-angular';



@Component({
    selector: 'page-signin',
    templateUrl: 'signin.html'
})
export class SignInPage {
  userModel: UserModel;
    user = { email : '', password : ''};


    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public authService: AuthService, 
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController
    ) {}
    

    signin2(){
      var datos = {email:"",password:""};
      let prompt = this.alertCtrl.create({
        title: 'Create User',
        message: "",
        inputs: [
          {
            name: 'Usuario',
            placeholder: 'Usuario',
            type:"email"
          },
          {
            name: 'Password',
            placeholder: 'Password',
            type:"password"
          },
          {
            name: 'ConfirmPassword',
            placeholder: 'Confirm Password',
            type:"password"
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Create',
            handler: data => {
              if(data.Usuario!='' && data.Password!='' && data.ConfirmPassword!=''){
                if( data.Password==data.ConfirmPassword){
                  this.authService.registerUser(data.Usuario,data.Password)
                  .then((user) => {
                    // El usuario se ha creado correctamente
                  })
                  .catch(err=>{
                      this.alertCtrl.create({
                      title: 'Error',
                      subTitle: err.message,
                      buttons: ['Aceptar']
                    }).present();
                  });
                }else{
                  this.alertCtrl.create({
                    title: 'ERROR',
                    subTitle: 'Las contraseñas no coinciden',
                    buttons: ['Aceptar']
                  }).present();
                }
              }
            }
          }
        ]
      });
      prompt.present();
    }
   
    login() {
        this.authService.loginUser(this.user.email,this.user.password )
        .then((user) => {})
        .catch(err=>{
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: err.message,
            buttons: ['Aceptar']
          });
          alert.present();
      });
    }
   
    logingoogle(){
      var a = this.authService;
      this.authService.loginUserWithGoolePlus().then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;     
        alert(JSON.stringify(result));   
        this.navCtrl.setRoot(HomePage)
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
    }
    loginfacebook(){
      this.authService.loginUserWithFacebook().then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        this.navCtrl.push(OtherPage);
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
    }
    logingithub(){         
      this.authService.loginUserWithGitHub().then(function(result) {
        if (result.credential) {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          var token = result.credential.accessToken;
        }
          // The signed-in user info.
          var user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
      });
    }
    logintwitter(){
      this.authService.loginUserWithTwitter().then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;     
      });
    }

    alert(title: string, message: string) {
      let alert = this.alertCtrl.create({
          title: title,
          subTitle: message,
          buttons: ['OK']
      });
      alert.present();
  }

  signIn() {
    
            
            let loading = this.loadingCtrl.create({
                content: 'Iniciando sesión. Por favor, espere...'
            });
            loading.present();
    
            this.authService.signInWithEmailAndPassword(this.userModel).then(result => {
                loading.dismiss();
    
                this.navCtrl.setRoot(HomePage);
            }).catch(error => {
                loading.dismiss();
    
                console.log(error);
                this.alert('Error', 'Correo/password incorrectos. Favor de verificar');
            });
        }
   
}
