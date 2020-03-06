import { Component, OnInit } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { Exam } from '../app.model';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  public code = '';
  public exam: Exam;

  constructor(private examService: ExamService) { }

  ngOnInit() {
  }

  submit() {
    this.examService.getExam(this.code).subscribe(exam => {
      this.exam = exam;
      console.log(this.exam);
    });
  }

}
