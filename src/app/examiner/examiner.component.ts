import {Component, OnInit} from '@angular/core';
import {ExamService} from '../services/exam.service';
import {Exam, Task} from '../app.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-examiner',
  templateUrl: './examiner.component.html',
  styleUrls: ['./examiner.component.scss']
})
export class ExaminerComponent implements OnInit {

  public exams: Exam[] = [];
  public currentExamId: number;
  public form: FormGroup;
  public exam: Exam;

  constructor(private examService: ExamService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
    this.examService.getAllExamsForExaminer().subscribe((exams: Exam[]) => {
      this.exams = exams;
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
      code: ['', Validators.required],
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

  saveExam() {
    this.examService.saveExam(this.exam.id).subscribe(result => {
      console.log(result);
    });
  }
}
