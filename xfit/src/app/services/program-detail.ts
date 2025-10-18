import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProgramDetail } from '../models/ProgramDetail.model';



@Injectable({
  providedIn: 'root'
})
export class ProgramDetailService {

  private BaseUrl: string = `${environment.apiUrl}/program/detail`;

  constructor(private http: HttpClient) {}

  /** Get all program details */
  getAllDetails(): Observable<ProgramDetail[]> {
    return this.http.get<ProgramDetail[]>(this.BaseUrl);
  }

  /**  Get detail by ID */
  getDetailById(id: number): Observable<ProgramDetail> {
    return this.http.get<ProgramDetail>(`${this.BaseUrl}/${id}`);
  }

  /**  Get details by program ID */
  getDetailsByProgramId(programId: string): Observable<ProgramDetail[]> {
    return this.http.get<ProgramDetail[]>(`${this.BaseUrl}/program/${programId}`);
  }

  /**  Create a new program detail */
  createDetail(detail: ProgramDetail): Observable<ProgramDetail> {
    return this.http.post<ProgramDetail>(this.BaseUrl, detail);
  }

  /**  Update an existing program detail */
  updateDetail(id: number, detail: ProgramDetail): Observable<ProgramDetail> {
    return this.http.put<ProgramDetail>(`${this.BaseUrl}/${id}`, detail);
  }

  /**  Delete a program detail */
  deleteDetail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BaseUrl}/${id}`);
  }
}
