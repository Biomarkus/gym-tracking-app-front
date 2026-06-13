import {Component, inject, input} from '@angular/core';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

addIcons({
  add,
});
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton, IonFab, IonFabButton, IonIcon
} from "@ionic/angular/standalone";
import {Session} from "types/session";
import {Router} from "@angular/router";
import {SessionsService} from "../../services/sessions.service";
import {formatDate} from "../../helpers/date-helper";
@Component({
  selector: 'app-sessions',
  standalone: true,
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss'],
  imports: [
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonButton,
    IonFab,
    IonFabButton,
    IonIcon
  ]
})
export class SessionsComponent {
  sessions = input.required<Session[]>();
  private router = inject(Router);
  private sessionsService: SessionsService = inject(SessionsService);
  protected readonly formatDate = formatDate;




  handleNewSession() {
    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    const defaultSessionName = `Workout - ${now.toLocaleDateString()} ${time}`;
    this.sessionsService.createSession(defaultSessionName).subscribe({next: (session) =>
        this.router.navigate(['/sessions', session.sessionId]),
      error: (err) =>  console.log(err)
    })

  }

  editSession(sessionId: number) {
    this.router.navigate(['/sessions', sessionId])
  }
}
