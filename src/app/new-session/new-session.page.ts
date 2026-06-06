import {Component, computed, inject, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonButton, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {ExerciseModalComponent} from "src/components/add-ex-modal/add-ex-modal";
import {ExercisesComponent} from "src/components/exercises/exercises.component";
import {Exercise} from "types/exercise";
import {exercisesData} from "src/utils/data";
import {SessionExercise} from "../../../types/session-exercise";
import {Session} from "../../../types/session";
import {SessionsService} from "../../services/sessions.service";

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.page.html',
  styleUrls: ['./new-session.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ExerciseModalComponent, ExercisesComponent, IonButton]
})
export class NewSessionPage implements OnInit {
  public sessionTitle = computed<String>(() => this.newSession()?.title || "New Session");
  private newSession = signal<Session|undefined>(undefined);
  public exercises = signal<Exercise[]>(exercisesData);
  public sessionExercises = signal<SessionExercise[]>([]);
  public isExerciseModalOpen = signal<boolean>(false);
  public selectedExercise = signal<Exercise|undefined>(undefined);

  private sessionsService: SessionsService = inject(SessionsService);

  ngOnInit() {
    const defaultSessionName = `Workout - ${new Date().toISOString().slice(0, 10)}`
    this.sessionsService.createSession(defaultSessionName).subscribe({next: (session) => this.newSession.set(session),
      error: (err) =>  console.log(err)
    })
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

}
