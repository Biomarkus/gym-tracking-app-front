import {Component, computed, inject, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonButton, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {ExerciseModalComponent} from "src/components/add-ex-modal/add-ex-modal";
import {ExercisesComponent} from "src/components/exercises/exercises.component";
import {Exercise} from "types/exercise";
import {exercisesData} from "src/utils/data";
import {MinimalSessionExercise, SessionExercise} from "../../../types/session-exercise";
import {ActivatedRoute, Router} from '@angular/router';
import {Session} from "../../../types/session";
import {SessionsService} from "../../services/sessions.service";
import {SessionExercisesService} from "../../services/session-exercises.service";
import {formatDate} from "../../helpers/date-helper";
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
  private sessionExercisesService: SessionExercisesService = inject(SessionExercisesService);
  private router = inject(Router);



  ngOnInit() {
    let sessionIdParam = this.route.snapshot.paramMap.get('sessionId');
    if(sessionIdParam){
      const sessionId= Number(sessionIdParam);
      this.getSession(sessionId);
      this.sessionExercisesService.getSessionsExercises(sessionId).subscribe({next: (sessionExercises) =>
          this.sessionExercises.set(sessionExercises),
        error: (err) =>  console.log(err)
      })
    }


  }

  openExercise(exercise: Exercise) {
    this.selectedExercise.set(exercise);
    this.isExerciseModalOpen.set(true);
  }

  onCloseExercise() {
    this.isExerciseModalOpen.set(false);
    this.selectedExercise.set(undefined);
  }
  onAddExercises(minimalSessionExercises: MinimalSessionExercise[]) {
    const currentSessionId = this.currentSession()?.sessionId;
    if(currentSessionId) {
      this.sessionExercisesService.createSessionExercises(currentSessionId, minimalSessionExercises).subscribe({next: (sessionExercises) =>
          this.sessionExercises.update(exercises => [...exercises, ...sessionExercises]),
        error: (err) =>  console.log(err)
        })
    }
  }

  onSessionExerciseDelete(sessionExerciseId: number){
    this.sessionExercisesService.deleteSessionExercise(sessionExerciseId).subscribe({next: () =>
      this.sessionExercises.update(exercises => exercises.filter((exercise) => exercise.id !== sessionExerciseId)),
      error: (err) =>  console.log(err)})
  }

  private getSession(sessionId: number) {
    this.sessionsService.getSessionById(sessionId).subscribe({next: (session) =>
        this.currentSession.set(session),
      error: (err) =>  console.log(err)
    })
  }

  onSessionClose(){
    this.router.navigate(['/sessions']);
    const sessionId = this.currentSession()?.sessionId;
    if(sessionId && !this.currentSession()?.endDate){
      this.sessionsService.updateSessionEndDate(sessionId, new Date().toISOString())
        .subscribe({error: (err) =>  console.log(err)})
    }

  }

  getEndDateFormatted(): string{
    const endDate= this.currentSession()?.endDate;
    return endDate ? `Ended: ${formatDate(endDate)}` : 'still in progress'
  }
}
