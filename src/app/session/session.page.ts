import {Component, computed, inject, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonButton, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {ExerciseModalComponent} from "src/components/add-ex-modal/add-ex-modal";
import {ExercisesComponent} from "src/components/exercises/exercises.component";
import {Exercise} from "types/exercise";
import {exercisesData} from "src/utils/data";
import {SessionExercise} from "../../../types/session-exercise";
import { ActivatedRoute } from '@angular/router';
import {Session} from "../../../types/session";
import {SessionsService} from "../../services/sessions.service";

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ExerciseModalComponent, ExercisesComponent, IonButton]
})
export class SessionPage implements OnInit {
  public currentSession = signal<Session|undefined>(undefined);
  public sessionTitle = computed<String>(() => this.currentSession()?.title || "New Session");
  public exercises = signal<Exercise[]>(exercisesData);
  public sessionExercises = signal<SessionExercise[]>([]);
  public isExerciseModalOpen = signal<boolean>(false);
  public selectedExercise = signal<Exercise|undefined>(undefined);

  private route = inject(ActivatedRoute);
  private sessionsService: SessionsService = inject(SessionsService);



  ngOnInit() {
    const sessionId = this.route.snapshot.paramMap.get('sessionId');
    sessionId && this.getSession(Number(sessionId));
  }

  openExercise(exercise: Exercise) {
    this.selectedExercise.set(exercise);
    this.isExerciseModalOpen.set(true);
  }

  onCloseExercise() {
    this.isExerciseModalOpen.set(false);
    this.selectedExercise.set(undefined);
  }
  onAddExercise(event: any) {
    this.sessionExercises.update(exercises => [...exercises, ...event.detail.value])
    this.onCloseExercise()
  }

  private getSession(sessionId: number) {
    this.sessionsService.getSessionById(sessionId).subscribe({next: (session) =>
        this.currentSession.set(session),
      error: (err) =>  console.log(err)
    })
  }
}
