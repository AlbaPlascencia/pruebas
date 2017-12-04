import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';
import * as firebase from 'firebase/app';

import { UserModel } from '../models/user-model';

@Injectable()
export class AuthService {
    providerGoogle: firebase.auth.GoogleAuthProvider;
    providerGithub: firebase.auth.GithubAuthProvider;
    providerFacebook: firebase.auth.FacebookAuthProvider;
    providerTwitter : firebase.auth.TwitterAuthProvider;
    providerCorreo: firebase.auth.EmailAuthProvider;
   
    constructor(private afAuth :  AngularFireAuth, public angularFireAuth: AngularFireAuth) {
      console.log('Hello AuthProvider Provider');
    }
   
    usuario(){
      return this.afAuth.auth.currentUser;
    }
   
      // Registro de usuario
    registerUser(email:string, password:string){
      return this.afAuth.auth.createUserWithEmailAndPassword( email, password)
        .then((res)=>{
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
      })
      .then(user=>Promise.resolve(user))
      .catch(err=>Promise.reject(err));
   }
   
   
   // Login de usuario
   loginUser(email:string, password:string){
     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .then(user=>Promise.resolve(user))
       .catch(err=>Promise.reject(err));
   }
   
   
   loginUserWithGoolePlus(){
    this.providerGoogle = new firebase.auth.GoogleAuthProvider();
    this.providerGoogle.addScope("https://www.googleapis.com/auth/userinfo.email");
    return firebase.auth().signInWithRedirect(this.providerGoogle)
    .then(user=>Promise.resolve(user))
    .catch(err=>Promise.reject(err));
   }
   
   loginUserWithTwitter(){
    this.providerTwitter = new firebase.auth.TwitterAuthProvider;
    this.providerTwitter.setCustomParameters({
      'lang': 'es',
      'email': 'true'
    });
    return firebase.auth().signInWithRedirect(this.providerTwitter)
    .then(user=>Promise.resolve(user))
    .catch(err=>Promise.reject(err));
   }
   
   loginUserWithGitHub(){
    this.providerGithub = new firebase.auth.GithubAuthProvider;
    this.providerGithub.addScope("user:email");
    firebase.auth().signInWithRedirect(this.providerGithub);
    return firebase.auth().getRedirectResult()
    .then(user=>Promise.resolve(user))
    .catch(err=>Promise.reject(err));
   }
   
   loginUserWithFacebook(){
    this.providerFacebook = new firebase.auth.FacebookAuthProvider;
    this.providerFacebook.addScope("email");
    return firebase.auth().signInWithRedirect(this.providerFacebook)
    
    .then(user=>Promise.resolve(user))
    .catch(err=>Promise.reject(err));
   }
   
   signInWithEmailAndPassword(userModel: UserModel): Promise<any> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(userModel.email, userModel.password);
}
   
   // Logout de usuario
   logout(){
     this.afAuth.auth.signOut().then(()=>{
       // hemos salido
     })
   }
   
   // Devuelve la session
   get Session(){
    return this.afAuth.authState;
   }
   
   updateEmail(email: any){
     return this.afAuth.auth.currentUser.updateEmail(email);
   }
   
   verificarEmail(){
     return this.afAuth.auth.currentUser.sendEmailVerification();
   }
   
   cambiarContraseña(pass: any){
    return this.afAuth.auth.currentUser.updatePassword(pass);
   }
   
   resetPassword(correo: any){
     return this.afAuth.auth.sendPasswordResetEmail(correo);
   }
   
   ligarCuentas(provedor: any, email="", password=""){
    var provider;
    if(provedor=="google") provider = new firebase.auth.GoogleAuthProvider();
    if(provedor=="facebook") provider = new firebase.auth.FacebookAuthProvider();
    if(provedor=="twitter") provider = new firebase.auth.TwitterAuthProvider();
    if(provedor=="github") provider = new firebase.auth.GithubAuthProvider();
    if(provedor == "correo"){
      return this.afAuth.auth.currentUser.linkWithCredential(firebase.auth.EmailAuthProvider.credential(email, password));
    }
      return this.afAuth.auth.currentUser.linkWithRedirect(provider);
   }
   
   obtenerResultados(){
     return this.afAuth.auth.getRedirectResult();
   }
   
   desAsociar(provedorID: any){
    return this.usuario().unlink(provedorID);
   }
   
    
}