import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

interface QuotableResponse {
  content: string;
  author: string;
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class Motivation {

  apiMotivation = environment.apiMotivation;
  
  constructor(private http: HttpClient) { }

  getRandomQuote(): Observable<any> {
    const proxyUrl = 'https://api.allorigins.win/get?url=';
const apiUrl = encodeURIComponent('https://zenquotes.io/api/quotes/random');
      console.log('API URL:', this.apiMotivation);  // ← Add this line
    return this.http.get<any>(`${proxyUrl}${apiUrl}`);
  }
}