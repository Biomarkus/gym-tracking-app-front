import { Component, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { sessionsData} from 'src/utils/data';
import {Session} from "types/session";
import {SessionsComponent} from "src/components/sessions/sessions.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, SessionsComponent],
})
export class HomePage {
  sessions = signal<Session[]>(sessionsData);

}
