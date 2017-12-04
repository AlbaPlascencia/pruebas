import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,NgZone } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { GooglePlus } from '@ionic-native/google-plus';
import { TwitterConnect } from '@ionic-native/twitter-connect';

import { Facebook } from '@ionic-native/facebook';
import { IonicStorageModule } from '@ionic/storage';


import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from '../providers/auth-service';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignInPage } from '../pages/signin/signin';
import { SignUpPage } from '../pages/signup/signup';
import {OtherPage} from "../pages/other/other"




export const firebaseConfig = {
  apiKey: "AIzaSyB5Ggh3htKPR98hjdm46jgKpyhhHd9IIwU",
  authDomain: "login-proyecto.firebaseapp.com",
  databaseURL: "https://login-proyecto.firebaseio.com",
  projectId: "login-proyecto",
  storageBucket: "login-proyecto.appspot.com",
  messagingSenderId: "535691712303"
};

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        SignInPage,
        SignUpPage,
        OtherPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        SignInPage,
        SignUpPage,
        OtherPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        AuthService,
        Facebook,
        GooglePlus,
        TwitterConnect
    ]
})
export class AppModule { }