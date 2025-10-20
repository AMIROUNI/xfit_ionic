import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Calorie } from '../services/calorie';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calorie-calculator',
  templateUrl: './calorie-calculator.page.html',
  styleUrls: ['./calorie-calculator.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class CalorieCalculatorPage implements OnInit {
  calorieForm!: FormGroup;
  caloriesNeeded?: number;
  loading = false;
  errorMsg?: string;

  uid?: string;

  genders = ['male', 'female'];
  goals = ['lose', 'maintain', 'gain'];
  activityLevels = [
    { value: 'light', label: 'Light' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'active', label: 'Active' },
    { value: 'very-active', label: 'Very Active' }
  ];

  calorieService = inject(Calorie);
  fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.calorieForm = this.fb.group({
      gender: ['male', Validators.required],
      age: [25, [Validators.required, Validators.min(1) , Validators.max(120)]],
      heightCm: [170, [Validators.required, Validators.min(30), Validators.max(300)]],
      weightKg: [70, [Validators.required, Validators.min(1), Validators.max(500)]],
      activityLevel: ['moderate', Validators.required],
      goal: ['maintain', Validators.required]
    });


    this.uid = history.state?.uid || localStorage.getItem('uid') || '';
  }

  calculateCalories() { 
    if (this.calorieForm.invalid) {
      this.calorieForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMsg = undefined;

    const { gender, age, heightCm, weightKg, activityLevel, goal } = this.calorieForm.value;

    this.calorieService.calculateCalories(weightKg, heightCm, age, gender, goal, activityLevel).subscribe({
      next: (res: number) => {
        this.caloriesNeeded = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error calculating calories:', err);
        this.errorMsg = 'Failed to calculate calories. Please try again.';
        this.loading = false;
      }
    });
  }
}
