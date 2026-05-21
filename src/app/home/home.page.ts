import {Component, inject, OnInit, signal} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import {Session} from "types/session";
import {SessionsComponent} from "src/components/sessions/sessions.component";
import {SessionsService} from "src/services/sessions.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, SessionsComponent],
})
export class HomePage implements OnInit {
  sessions = signal<Session[]>([]);
  private sessionsService: SessionsService = inject(SessionsService);

  ngOnInit() {
    this.sessionsService.getSessions({}).subscribe(
      {next: (sessions) => this.sessions.set(sessions),
        error: (err) =>  console.log(err)
      }

    )
  }

}
