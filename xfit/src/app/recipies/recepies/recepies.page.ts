import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonGrid, IonRow, IonCol, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

@Component({
  selector: 'app-recepies',
  templateUrl: './recepies.page.html',
  styleUrls: ['./recepies.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonCard,
    IonCardHeader, IonCardTitle, IonCardContent, IonImg,
    IonGrid, IonRow, IonCol, IonTabBar, IonTabButton,
    IonIcon, IonLabel, IonBadge,
    CommonModule, FormsModule, RouterLink // Add RouterLink here
    ,
    IonButtons,
    IonBackButton
]
})
export class RecepiesPage implements OnInit {
  
  route = inject(ActivatedRoute);
  router = inject(Router);
  http = inject(HttpClient);
  
  recipes: Recipe[] = [];
  uid: string = '';
  
  private apiKey = '9425b44025cc4f26a68f6cb20a480c9c';
  private baseUrl = 'https://api.spoonacular.com/recipes';

  constructor() {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uid = params['uid'];
      console.log('User UID:', this.uid);
    });

    this.loadRecipes();
  }

  private loadRecipes() {
    console.log('Loading recipes...');
    const url = `${this.baseUrl}/random?number=8&apiKey=${this.apiKey}`;
    
    this.http.get(url).subscribe({
      next: (response: any) => {
        this.recipes = response.recipes;
        console.log('Recipes loaded:', this.recipes);
      },
      error: (error) => {
        console.error('Error loading recipes:', error);
      }
    });
  }

  goToHome() {
    this.router.navigate(['/main', this.uid]);
  }

  viewRecipe(id: number) {
  console.log('Viewing recipe with ID:', id);
  this.router.navigate(['/recipe-detail', id]);
}
}