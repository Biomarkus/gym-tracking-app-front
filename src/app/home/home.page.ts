import { Component, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { ExercisesComponent } from 'src/components/exercises/exercises.component';
import { exercisesData } from 'src/utils/data';
import { Exercise } from 'types/exercise';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExercisesComponent],
})
export class HomePage {
  exercises = signal<Exercise[]>(exercisesData);
}
