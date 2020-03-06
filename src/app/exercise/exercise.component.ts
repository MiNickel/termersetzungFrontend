import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../services/exercise.service';
import { Exercise } from '../app.model';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  public exercises: Exercise[];
  public numberOfRows: number;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.exerciseService.getAllExercises().subscribe((exercises: Exercise[]) => {
      this.exercises = exercises;
      this.numberOfRows = Math.ceil(exercises.length / 3);
    });
  }

  array(n: number): any[] {
    return Array(n);
  }

}
