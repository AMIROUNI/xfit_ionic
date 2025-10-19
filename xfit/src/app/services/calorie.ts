import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Calorie {
  private baseUrl = 'http://localhost:8090/api/v1/calories';

  constructor(private http: HttpClient) {}

  calculateCalories(
    weightKg: number,
    heightCm: number,
    age: number,
    gender: string,
    goal: string,
    activityLevel: string = 'moderate',
    firebaseUid: string = ''
  ): Observable<number> {
    const body = {
      firebaseUid,
      gender,
      age,
      heightCm,
      weightKg,
      activityLevel,
      goal
    };

    return this.http.post<{ caloriesNeeded: number }>(`${this.baseUrl}/calculate`, body)
      .pipe(map(response => response.caloriesNeeded));
  }
}
