import {Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonButton, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {ExerciseModalComponent} from "src/components/add-ex-modal/add-ex-modal";
import {ExercisesComponent} from "src/components/exercises/exercises.component";
import {Exercise} from "types/exercise";
import {exercisesData} from "src/utils/data";

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.page.html',
  styleUrls: ['./new-session.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ExerciseModalComponent, ExercisesComponent, IonButton]
})
export class NewSessionPage{

  exercises = signal<Exercise[]>(exercisesData);
  isExerciseModalOpen = signal<boolean>(false);
  selectedExercise = signal<Exercise|undefined>(undefined);


  openExercise(exercise: Exercise) {
    this.selectedExercise.set(exercise);
    this.isExerciseModalOpen.set(true);
  }

  onCloseExercise() {
    this.isExerciseModalOpen.set(false);
    this.selectedExercise.set(undefined);
  }
  onAddExercise() {
   this.onCloseExercise()
  }



}
