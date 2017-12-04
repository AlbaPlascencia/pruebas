import { Component } from '@angular/core';
import { ActionSheetController, NavController, ModalController,AlertController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { SignInPage } from '../signin/signin';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  dato: any;

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public alertCtrl: AlertController,public actionSheetCtrl: ActionSheetController)  {

      this.dato = this.authService.usuario();
  }

  imgLogo(pro: String): String{
    if(pro=="google.com"){
      return "logo-google";
    }
    if(pro=="facebook.com"){
      return "logo-facebook";
    }
    if(pro=="twitter.com"){
      return "logo-twitter";
    }
    if(pro=="github.com"){
      return "logo-github";
    }
    return "mail";
  }
 
  ionViewCanEnter(){
   this.authService.obtenerResultados().then(function(result) {
    if (result.credential) {
      // Accounts successfully linked.
      console.log('hola0');
      var credential = result.credential;
      var user = result.user;
    }
    }).catch(function(error) {
    // Handle Errors here.
    // ...
    });
    return true;
  }
  mensage(men: String){
    this.alertCtrl.create({
      title: 'Error',
      subTitle: men+'',
      buttons: ['Aceptar']
    }).present();
  }
   socialNetwork(){
    var clase = this;
    this.actionSheetCtrl.create({
      title: 'Sign In with Social Network',
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Google',
          role: 'destructive',
          icon: 'logo-google',
          handler: ()=>{
            var a = this.authService;
            this.authService.ligarCuentas('google').then(function(result) {
              // Accounts successfully linked.
              var credential = result.credential;
              var user = result.user;
              // ...
            }).catch(function(error) {
              clase.mensage('La cuenta ya se vinculo con este provedor');
            });
          }
        },
        {
          text: 'Facebook',
          icon:'logo-facebook',
          handler: ()=>{
            this.authService.ligarCuentas('facebook').then(function(result) {
              // Accounts successfully linked.
              var credential = result.credential;
              var user = result.user;
              // ...
            }).catch(function(error) {
              clase.mensage('La cuenta ya se vinculo con este provedor');
            });
          }
        },
        {
          text: 'GitHub',
          icon: 'logo-github',
          handler: ()=>{
            this.authService.ligarCuentas('github').then(function(result) {
              // Accounts successfully linked.
              console.log('hola1');
              var credential = result.credential;
              var user = result.user;
              // ...
             
              console.log('user1',result.user);
            }).catch(function(error) {
              clase.mensage('La cuenta ya se vinculo con este provedor');
            });
          }
        },
        {
          text: 'Twiter',
          icon:'logo-twitter',
          handler: ()=>{
            this.authService.ligarCuentas('twitter').then(function(result) {
              // Accounts successfully linked.
              var credential = result.credential;
              var user = result.user;
              // ...
            }).catch(function(error) {
              clase.mensage('La cuenta ya se vinculo con este provedor');
            });
          }
        },
        {
          text: 'Correo',
          icon:'logo-email',
          handler: ()=>{
            var datos = {email:"",password:""};
            let prompt = this.alertCtrl.create({
              title: 'Login',
              message: "Enter a name for this new album you're so keen on adding",
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
              ],
              buttons: [
                {
                  text: 'Cancel',
                  handler: data => {
                    console.log('Cancel clicked');
                  }
                },
                {
                  text: 'Login',
                  handler: data => {
                    if(data.Usuario!="" && data.Password!=""){
                    this.authService.ligarCuentas('correo',data.Usuario,data.Password).then(function(result) {
                      var credential = result.credential;
                      var user = result.user;
                     
                    }).catch(function(error) {
                      clase.mensage('Verifica los datos Introducidos');
                    });
                  }else{
                    clase.mensage('Completa los Campos');
                  }
                  }
                }
              ]
            });
            prompt.present();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }).present();
  }
 
  desvincular(provedorID: any){
    this.authService.desAsociar(provedorID).then(function() {
      this.mensage(provedorID+" Desvinculado");
    }).catch(function(error) {
      // An error happened
    });
  }
 }
 