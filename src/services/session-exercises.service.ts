import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Session, SessionFilter} from "types/session";
import {environment} from "src/environments/environment";
import {SessionExercise} from "../../types/session-exercise";


@Injectable({
  providedIn: 'root'
})

export class SessionExercisesService {
  private  readonly  http: HttpClient = inject(HttpClient)

  public createSessionExercises(sessionExercises: SessionExercise[]): Observable<SessionExercise[]> {
    return this.http.post<SessionExercise[]>(environment.apiUrl + '/api/v1/session-exercises', {sessionExercises})
  }

  public getSessionsExercises(sessionId: number): Observable<SessionExercise[]> {
    return this.http.get<SessionExercise[]>(environment.apiUrl + `/api/v1/session/${sessionId}/exercises`)
  }
}
