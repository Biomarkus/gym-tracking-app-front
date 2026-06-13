import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";
import {MinimalSessionExercise, SessionExercise} from "../../types/session-exercise";


@Injectable({
  providedIn: 'root'
})

export class SessionExercisesService {
  private  readonly  http: HttpClient = inject(HttpClient)

  public createSessionExercises(sessionId: number, sessionExercises: MinimalSessionExercise[]): Observable<SessionExercise[]> {
    return this.http.post<SessionExercise[]>(environment.apiUrl + `/api/v1/session/${sessionId}/exercises`, {sessionExercises})
  }

  public getSessionsExercises(sessionId: number): Observable<SessionExercise[]> {
    return this.http.get<SessionExercise[]>(environment.apiUrl + `/api/v1/session/${sessionId}/exercises`)
  }

  public deleteSessionExercise(sessionExerciseId: number): Observable<SessionExercise[]> {
    return this.http.delete<SessionExercise[]>(environment.apiUrl + `/api/v1/session-exercise/${sessionExerciseId}`)
  }
}
