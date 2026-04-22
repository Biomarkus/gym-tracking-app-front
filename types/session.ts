import {SessionExercise} from "./session-exercise";

export interface Session {
  sessionId: number;
  title: string;
  startDate: string
  endDate: string
  sessionExercises: SessionExercise[]
}
