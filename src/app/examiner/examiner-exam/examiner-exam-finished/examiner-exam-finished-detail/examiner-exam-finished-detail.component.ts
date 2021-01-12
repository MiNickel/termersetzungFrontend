import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';
import { StudentExam, Exam, Student, Task } from 'src/app/app.model';
import { StudentService } from 'src/app/services/student.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { StudentExamService } from 'src/app/services/student.exam.service';

@Component({
  selector: 'app-examiner-exam-finished-detail',
  templateUrl: './examiner-exam-finished-detail.component.html',
  styleUrls: ['./examiner-exam-finished-detail.component.css']
})
export class ExaminerExamFinishedDetailComponent implements OnInit {

  public studentExam: StudentExam;
  public exam: Exam;
  public student: Student;
  public showScore = true;

  constructor(private route: ActivatedRoute, private examService: ExamService,
    // tslint:disable-next-line: align
    private studentService: StudentService, private studentExamService: StudentExamService) { }

  ngOnInit() {
    const studentExamId = this.route.snapshot.params.id;
    this.studentExamService.getStudentExam(studentExamId).subscribe(studentExam => {
      this.studentExam = studentExam;
      this.examService.getExamById(studentExam.examId).subscribe(exam => {
        this.exam = exam;
      });
      this.studentService.getStudentById(studentExam.studentId).subscribe(student => {
        this.student = student;
      });
    });
  }

  getTaskScore(studentTaskName: string): number {
    return this.exam.tasks.find(task => task.name === studentTaskName).score;
  }

  downloadWithScore() {
    const data = document.getElementById('content');
    this.download(true);
  }

  downloadWithoutScore() {
    const me = this;
    this.showScore = false;
    window.setTimeout(() => me.download(false),
      1000);
  }

  private download(showScore: boolean) {
    const data = document.getElementById('content');
    html2canvas(data).then(canvas => {

      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      if (showScore === true) {
        pdf.save(this.exam.name + '_' + this.student.firstname + '_' + this.student.lastname + '_withScore');
      } else if (showScore === false) {
        pdf.save(this.exam.name + '_' + this.student.firstname + '_' + this.student.lastname);
        this.showScore = true;
      }
    });
  }

}
