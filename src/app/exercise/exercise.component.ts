import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../services/exercise.service';
import { Exercise, StudentExercise } from '../app.model';
import { Router } from '@angular/router';
import { StudentExerciseService } from '../services/student.exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  public studentExercises: StudentExercise[];
  public exercises: Exercise[];
  public studentExerciseNameMap = new Map<number, string>();

  constructor(private exerciseService: ExerciseService, private router: Router, private studentExerciseService: StudentExerciseService) { }

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    const jsonObject = JSON.parse(currentUser);
    const studentId: number = jsonObject.studentId;

    this.studentExerciseService.getAllExercisesForStudent(studentId).subscribe((studentExercises: StudentExercise[]) => {
      this.studentExercises = studentExercises;
      this.exerciseService.getAllExercises().subscribe((exercises: Exercise[]) => {
        for (const studentExercise of studentExercises) {
          this.studentExerciseNameMap.set(studentExercise.exerciseId,
            exercises.find(exercise => exercise.id === studentExercise.exerciseId).name);
          const index = exercises.findIndex(e => e.id === studentExercise.exerciseId);
          exercises.splice(index, 1);
        }
        this.exercises = exercises;
      });

    });
  }

  public openExercise(exerciseId: number) {
    this.router.navigate(['/exercise', exerciseId]);
  }

}
