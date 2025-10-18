import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonNote, IonCardSubtitle, IonAvatar, IonBackButton, IonButtons, IonRouterLink } from '@ionic/angular/standalone';
import { Fireservice } from '../services/fireservice';
import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonButtons, IonBackButton, IonAvatar, IonCardSubtitle, IonNote, IonLabel, IonItem, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRouterLink, RouterLinkWithHref]
})
export class ProfilePage implements OnInit {

  uid: string = '';
  userData: any;
  constructor(private fireservice:Fireservice,private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.uid = params.get('uid') || '';
      console.log('Profile UID:', this.uid);
    });
    this.loadDataProfile();
  }


  loadDataProfile(){
    this.fireservice.getUserData(this.uid)
    .then((data:any)=>{
      console.log('User Data:',data);
      this.userData = data;
    },(error)=>{
      console.error('Error fetching user data:',error);
    });

  }

}
