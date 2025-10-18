import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Program } from '../models/Program.model';



@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private BaseUrl: string = `${environment.apiUrl}/program`;

  constructor(private http: HttpClient) {}

  /**  Get all programs */
  getAllPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(this.BaseUrl);
  }

  /**  Get program by ID */
  getProgramById(id: number): Observable<Program> {
    return this.http.get<Program>(`${this.BaseUrl}/${id}`);
  }

  /**  Create a new program */
  createProgram(program: Program): Observable<Program> {
    return this.http.post<Program>(this.BaseUrl, program);
  }

  /**  Update an existing program */
  updateProgram(id: number, program: Program): Observable<Program> {
    return this.http.put<Program>(`${this.BaseUrl}/${id}`, program);
  }

  /**  Delete a program */
  deleteProgram(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BaseUrl}/${id}`);
  }
}
