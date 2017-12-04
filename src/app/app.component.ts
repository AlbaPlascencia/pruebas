import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthService } from '../providers/auth-service';



import { SignInPage } from '../pages/signin/signin';
import { HomePage } from '../pages/home/home';
import { OtherPage } from '../pages/other/other';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = SignInPage;

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        authService: AuthService) {
            platform.ready().then(() => {
            if (authService.Session) {
                this.rootPage = SignInPage;
            } else {
                this.rootPage = SignInPage;
            }
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}