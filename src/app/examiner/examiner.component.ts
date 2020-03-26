import {Component, OnInit} from '@angular/core';
import {ExamService} from '../services/exam.service';
import {Exam, Task, Exercise} from '../app.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-examiner',
  templateUrl: './examiner.component.html',
  styleUrls: ['./examiner.component.scss']
})
export class ExaminerComponent implements OnInit {

  public exams: Exam[] = [];
  public exercises: Exercise[] = [];
  public currentExamId: number;
  public form: FormGroup;
  public exam: Exam;
  public showPassword = false;

  constructor(private examService: ExamService, private fb: FormBuilder, private exerciseService: ExerciseService) {
  }

  ngOnInit() {
    this.createForm();
    this.examService.getAllExamsForExaminer().subscribe((exams: Exam[]) => {
      this.exams = exams;
    });
    this.exerciseService.getAllExercises().subscribe((exercises: Exercise[]) => {
      this.exercises = exercises;
    });
  }

  goToExam(id: number) {
    this.currentExamId = id;
    this.examService.getExamById(this.currentExamId).subscribe((exam: Exam) => {
      this.exam = exam;
      this.form.reset(this.modelToForm(this.exam));
    });
  }

  private createForm() {
    this.form = this.fb.group({
      id: [-1, Validators.required],
      name: ['', Validators.required],
      examiner: new FormGroup({
        firstname: new FormControl(''),
        lastname: new FormControl('')
      }),
      code: [{value: '', disabled: true}, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  private modelToForm(exam: Exam) {
    return {
      id: exam.id,
      name: exam.name,
      examiner: exam.examiner,
      code: exam.code,
      startDate: exam.startDate,
      endDate: exam.endDate
    };
  }

  /* private formToModel() {
    const formValues = this.form.controls;
    return new Exam(
      formValues.id.value,
      formValues.name.value,
      formValues.examiner.value,
      formValues.code.value,
      formValues.startDate.value,
      formValues.endDate.value
    )
  } */

  saveExam() {
    this.examService.saveExam(this.exam).subscribe(result => {
      console.log(result);
    });
  }

  changePasswordState() {
    this.showPassword = !this.showPassword;
  }
}
