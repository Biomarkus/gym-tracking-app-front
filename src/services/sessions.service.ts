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
}
