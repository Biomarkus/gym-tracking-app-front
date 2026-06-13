import {Exercise} from "./exercise";

export interface SessionExercise {
  sessionId: number;
  exerciseId: number;
  exercise?: Exercise;
  reps: number;
  weight: number;
}

export interface MinimalSessionExercise {
  exerciseId: number;
  reps: number;
  weight: number;
}

