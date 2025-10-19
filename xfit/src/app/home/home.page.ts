import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon ,RouterLink, CommonModule ],
})
export class HomePage {
  http = inject(HttpClient);


  weather: any;
  message: string = '';
  icon: string = '';
  

  constructor() {}

  ngOnInit() {
    this.loadWeather();
  }

  loadWeather() {
  const latitude = 36.8065;
  const longitude = 10.1815

    this.http
      .get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
      .subscribe((data: any) => {
        this.weather = data.current_weather;
        this.setWeatherMessage(this.weather.weathercode);
      });
  }

  setWeatherMessage(code: number) {
    // Simplified interpretation of weather codes
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
      this.message = "It's rainy 🌧️ — stay at the gym today!";
      this.icon = 'rainy-outline';
    } else if ([0, 1, 2].includes(code)) {
      this.message = "Perfect weather ☀️ — go for a run outdoors!";
      this.icon = 'sunny-outline';
    } else {
      this.message = "A good day for indoor training 🏋️";
      this.icon = 'cloud-outline';
    }
  }
}
