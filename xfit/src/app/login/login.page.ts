import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Fireservice } from '../services/fireservice';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonProgressBar,
  IonText, IonImg } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    FormsModule, IonImg,IonProgressBar]
})


export class LoginPage {
  email: string = '';
  password: string = '';
  isLoading:boolean=false;

  constructor(private fireService: Fireservice, private router: Router) {}

  //  Login user
  async login() {
    this.isLoading=true;
    if (!this.email || !this.password) {
      alert('Please fill in both fields');
      return;
    }

    try {
      const res = await this.fireService.loginWithEmail({
        email: this.email,
        password: this.password
      });
      console.log('Login successful:', res);
      alert('Welcome back!');
      const uid = res.user.uid;
      this.isLoading=false;
      this.router.navigate(['/main', uid]);
    } catch (error: any) {
      this.isLoading=false;
      console.error(error);
      alert(error.message);
    }
  }

  //  Navigate to signup page
  signup() {
    this.router.navigate(['/signup']);
  }
}
