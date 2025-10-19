import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonBadge, IonChip, IonIcon, IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface RecipeDetail {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  healthScore: number;
  pricePerServing: number;
  summary: string;
  instructions: string;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  extendedIngredients: Array<{
    id: number;
    name: string;
    amount: number;
    unit: string;
    original: string;
  }>;
  nutrition?: {
    nutrients: Array<{
      name: string;
      amount: number;
      unit: string;
    }>;
  };
}

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipies-details.page.html',
  styleUrls: ['./recipies-details.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,
    IonBackButton, IonCard, IonCardHeader, IonCardTitle,
    IonCardContent, IonImg, IonBadge, IonChip, IonIcon,
    IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol,
    CommonModule, FormsModule,
    IonButton
]
})
export class RecipiesDetailsPage implements OnInit {
  route = inject(ActivatedRoute);
  http = inject(HttpClient);

  recipe: RecipeDetail | null = null;
  recipeId: number = 0;
  isLoading: boolean = true;

  private apiKey = '9425b44025cc4f26a68f6cb20a480c9c'; // Replace with your API key
  private baseUrl = 'https://api.spoonacular.com/recipes';

  constructor() {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recipeId = +params['id'];
      console.log('Recipe ID:', this.recipeId);
      this.loadRecipeDetail();
    });
  }

  private loadRecipeDetail() {
    console.log('Loading recipe details...');
    this.isLoading = true;
    const url = `${this.baseUrl}/${this.recipeId}/information?apiKey=${this.apiKey}&includeNutrition=true`;

    this.http.get<RecipeDetail>(url).subscribe({
      next: (response) => {
        this.recipe = response;
        this.isLoading = false;
        console.log('Recipe details loaded:', this.recipe);
      },
      error: (error) => {
        console.error('Error loading recipe details:', error);
        this.isLoading = false;
      }
    });
  }

  getCalories(): number {
    if (!this.recipe?.nutrition?.nutrients) return 0;
    const caloriesNutrient = this.recipe.nutrition.nutrients.find(
      n => n.name === 'Calories'
    );
    return caloriesNutrient ? Math.round(caloriesNutrient.amount) : 0;
  }

  getProtein(): number {
    if (!this.recipe?.nutrition?.nutrients) return 0;
    const proteinNutrient = this.recipe.nutrition.nutrients.find(
      n => n.name === 'Protein'
    );
    return proteinNutrient ? Math.round(proteinNutrient.amount) : 0;
  }

  getCarbs(): number {
    if (!this.recipe?.nutrition?.nutrients) return 0;
    const carbsNutrient = this.recipe.nutrition.nutrients.find(
      n => n.name === 'Carbohydrates'
    );
    return carbsNutrient ? Math.round(carbsNutrient.amount) : 0;
  }

  getFat(): number {
    if (!this.recipe?.nutrition?.nutrients) return 0;
    const fatNutrient = this.recipe.nutrition.nutrients.find(
      n => n.name === 'Fat'
    );
    return fatNutrient ? Math.round(fatNutrient.amount) : 0;
  }

  stripHtmlTags(html: string): string {
    if (!html) return '';
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}