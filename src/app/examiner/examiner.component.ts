import { Component, OnInit } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { Exam, Task, Exercise } from '../app.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExerciseService } from '../services/exercise.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-examiner',
  templateUrl: './examiner.component.html',
  styleUrls: ['./examiner.component.scss']
})
export class ExaminerComponent implements OnInit {

  public exams: Exam[] = [];
  public exercises: Exercise[] = [];

  constructor(private examService: ExamService, private fb: FormBuilder, private exerciseService: ExerciseService, private router: Router) {
  }

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    const jsonObject = JSON.parse(currentUser);
    const examinerId: number = jsonObject.examinerId;
    this.examService.getAllExamsForExaminer(examinerId).subscribe((exams: Exam[]) => {
      this.exams = exams;
    });
    this.exerciseService.getAllExercisesForExaminer(examinerId).subscribe((exercises: Exercise[]) => {
      this.exercises = exercises;
    });
  }

  goToExam(id: number) {
    this.router.navigate(['/examiner/exam/', id]).then(r => {
    });
  }

  goToExercise(id: number) {
    this.router.navigate(['/examiner/exercise/', id]).then(r => {
    });
  }
}
