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

  public exercises: Exercise[];
  public numberOfRows: number;

  constructor(private exerciseService: ExerciseService, private router: Router) { }

  ngOnInit() {
    this.exerciseService.getAllExercises().subscribe((exercises: Exercise[]) => {
      this.exercises = exercises;
      this.numberOfRows = Math.ceil(exercises.length / 3);
    });
  }

  public array(n: number): any[] {
    return Array(n);
  }

  public openExercise(index: number) {
    this.router.navigate(['/exercise', this.exercises[index].id]);
  }

}
