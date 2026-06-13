import {Component, computed, input, output, signal} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Exercise} from "../../../types/exercise";
import {MinimalSessionExercise, SessionExercise} from "../../../types/session-exercise";

@Component({
  selector: 'app-add-ex-modal',
  templateUrl: './add-ex-modal.html',
  styleUrls: ['./add-ex-modal.scss'],
  imports: [
    IonicModule,
  ]
})
export class ExerciseModalComponent{
  isOpen = input.required<boolean>();
  exercise = input.required<Exercise|undefined>();
  addExercise = output<MinimalSessionExercise[]>();
  closeExercise = output<void>();
  public newSessionExercises = signal<MinimalSessionExercise[]>([]);
  public selectedWeight = signal<number>(1);
  public selectedCount = signal<number>(1);
  public selectedNewSessionExercises = computed<MinimalSessionExercise[]>(() =>
    this.newSessionExercises().filter((ex) => ex.exerciseId == this.exercise()?.id))
  public kgsToChoose = [...Array(200).keys()].map(x => x + 1);
  public countToChoose = [...Array(50).keys()].map(x => x + 1);

  onAddExercise() {
    if(this.newSessionExercises().length > 0) {
      this.addExercise.emit(this.newSessionExercises());
      this.newSessionExercises.set([]);
    }
    this.closeExercise.emit();
  }

  onAddSessionExercise() {
    this.newSessionExercises.update(exercises => [...exercises, {exerciseId: this.exercise()?.id || 1,
      reps: this.selectedCount(),
      weight: this.selectedWeight()}]);
  }

  onWeightChange(event: any) {
    this.selectedWeight.set(event.detail.value);
  }
  onCountChange(event: any) {
    this.selectedCount.set(event.detail.value);
  }

  onDeleteExercise(exerciseIndex: number) {
    this.newSessionExercises.update((exercises) =>
      exercises.filter((_, index) => index !== exerciseIndex));
  }
}
