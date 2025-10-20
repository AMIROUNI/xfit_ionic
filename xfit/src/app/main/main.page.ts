import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList,IonProgressBar, IonLabel, IonItem, IonCard, IonImg, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonGrid, IonRow, IonCol, IonSkeletonText, IonButton, IonIcon, IonBadge, IonTabButton, IonTabs, IonTabBar, IonTab, IonSearchbar, IonRouterLink } from '@ionic/angular/standalone';
import { ProgramService } from '../services/program';
import { Program } from '../models/Program.model';
import { Motivation } from '../services/motivation';
import { ActivatedRoute, Router, RouterEvent, RouterLinkWithHref } from '@angular/router';
import { Fireservice } from '../services/fireservice';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonTabBar, IonTabButton, IonBadge, IonIcon, IonButton, IonSkeletonText, IonCol, IonRow, IonGrid, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonCard, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRouterLink, RouterLinkWithHref,IonProgressBar]
})
export class MainPage implements OnInit {
  programs: Program[] = [];
  filteredPrograms: Program[] = [];
  motivationalQuote: any;
  uid: string = '';
  username: string = '';
  isLoadingUser: boolean = false;
  isLoadingMotiv: boolean = false;
  isLoadingProg: boolean = false;

  constructor(private programService: ProgramService,
     private motivationService: Motivation,
    private route: ActivatedRoute,
     private router: Router
    ,private fireservice:Fireservice) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uid = params['uid'];
      console.log('User UID:', this.uid);
    });
    this.loadPrograms();
    this.getMotivation();
    this.loadUserData();
  }

  private loadUserData() {
    this.isLoadingUser = true;
    console.log('Loading user data for UID:', this.uid);
    this.fireservice.getUserData(this.uid).then((data: any) => {
      this.isLoadingUser = false;
      console.log('User Data:', data);
      this.username = data.email.split('@')[0];
    }, (error) => {
      this.isLoadingUser = false;
      console.error('Error fetching user data:', error);
    });
  }

  private loadPrograms() {
    this.isLoadingProg = true;
    console.log('Loading programs...');
    this.programService.getAllPrograms().subscribe((data: Program[]) => {
      this.isLoadingProg = false;
      this.programs = data;
      this.filteredPrograms = data;
      console.log('Programs loaded:', this.programs);
    }, (error) => {
      this.isLoadingProg = false;
      console.error('Error loading programs:', error);
    });

}


private getMotivation() {
  this.isLoadingMotiv = true;
  this.motivationService.getRandomQuote().subscribe((res: any) => {
    this.isLoadingMotiv = false;

    console.log('Raw response:', res);

    // Parse the contents string
    const quotesArray = JSON.parse(res.contents);

    // Take the first quote
    if (quotesArray.length > 0) {
      this.motivationalQuote = {
        content: quotesArray[0].q,
        author: quotesArray[0].a
      };
    }
    console.log('Motivational quote:', this.motivationalQuote);
  }, (error) => {
    this.isLoadingMotiv = false;
    console.error('Error loading motivational quote:', error);
  });
}







onSearchChange(searchValue: string) {
  console.log('Search value changed:', searchValue);
 if(searchValue.trim() === '') {
    this.filteredPrograms = this.programs;
    return;
  }
  this.filteredPrograms = this.programs.filter(p => p.title.toLowerCase().includes(searchValue.toLowerCase()));
}


  startProgram(id: number | undefined) {
    console.log('Starting program with ID:', id);
    // Navigate to the program details page
    if (id !== undefined) {
      this.router.navigate(['/program-detail', id]);
   }
  }




   navigateToCalorieCalculator() {
    this.router.navigate(['/calorie-calculator'], {
      state: { uid: this.uid }
    });
  }
}



