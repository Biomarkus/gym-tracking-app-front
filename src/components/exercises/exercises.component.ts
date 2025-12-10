import { Component, input, model, OnInit } from '@angular/core';
import { Exercise } from 'types/exercise';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
  imports: [
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonButton,
  ],
})
export class ExercisesComponent {
  exercises = input.required<Exercise[]>();
  exImageBasePath = 'assets/exercise_images/';
}
