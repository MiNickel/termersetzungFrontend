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
  public finishedExams: Exam[] = [];
  public exercises: Exercise[] = [];

  constructor(private examService: ExamService, private fb: FormBuilder, private exerciseService: ExerciseService, private router: Router) {
  }

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    const jsonObject = JSON.parse(currentUser);
    const examinerId: number = jsonObject.examinerId;
    this.examService.getAllExamsForExaminer(examinerId).subscribe((exams: Exam[]) => {
      if (exams.length > 0) {
        const dateNow: Date = new Date();
        this.exams = exams.filter(exam => new Date(exam.startDate).getTime() > dateNow.getTime());
        this.finishedExams = exams.filter(exam => new Date(exam.endDate).getTime() < dateNow.getTime());
        const examDate: Date = new Date(exams[0].endDate);
      }
    });
    this.exerciseService.getAllExercisesForExaminer(examinerId).subscribe((exercises: Exercise[]) => {
      this.exercises = exercises;
    });
  }

  goToExam(id: number) {
    this.router.navigate(['/examiner/exam/', id]);
  }

  goToExercise(id: number) {
    this.router.navigate(['/examiner/exercise/', id]);
  }

  goToFinishedExam(id: number) {
    this.router.navigate(['/examiner/studentexam/', id]);
  }
}
