import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../services/exercise.service';
import { Exercise } from '../app.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  public studentExercises: Exercise[];
  public exercises: Exercise[];

  constructor(private exerciseService: ExerciseService, private router: Router) { }

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    const jsonObject = JSON.parse(currentUser);
    const studentId: number = jsonObject.studentId;

    this.exerciseService.getAllExercisesForStudent(studentId).subscribe((exercises: Exercise[]) => {
      this.studentExercises = exercises;
    });
    this.exerciseService.getAllExercises().subscribe((exercises: Exercise[]) => {
      console.log(exercises);
      this.exercises = exercises;
    });
  }

  public array(n: number): any[] {
    return Array(n);
  }

  public openExercise(exerciseId: number) {
    this.router.navigate(['/exercise', exerciseId]);
  }

}
