import {Component, input, output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Exercise} from "../../../types/exercise";

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
  addExercise = output<void>();
  closeExercise = output<void>();
  public kgsToChoose = [...Array(200).keys()].map(x => x + 1);
  public countToChoose = [...Array(50).keys()].map(x => x + 1);

  onAddExercise() {
    this.addExercise.emit();
  }

}
