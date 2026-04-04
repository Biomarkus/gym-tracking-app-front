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


  formatDate(dateStr: string) {
    return new Date(dateStr).toDateString();
  }

  navigateToNewSession() {
    this.router.navigate(['/sessions/new']);
  }
}
