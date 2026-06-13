import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Session, SessionFilter} from "types/session";
import {environment} from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})

export class SessionsService {
  private  readonly  http: HttpClient = inject(HttpClient)

  public getSessions(filters: SessionFilter): Observable<Session[]> {
    return this.http.post<Session[]>(environment.apiUrl + '/api/v1/session/filter', filters)
  }
  public getSessionById(sessionId: number): Observable<Session> {
    return this.http.get<Session>(environment.apiUrl + `/api/v1/session/${sessionId}`)
  }
  public createSession(title: string): Observable<Session> {
    return this.http.post<Session>(environment.apiUrl + '/api/v1/sessions', {title})
  }
  public updateSessionEndDate(session_id: number, endDate: string){
    return this.http.put<Session>(environment.apiUrl + `/api/v1/session/${session_id}`, {endDate})
  }
}
