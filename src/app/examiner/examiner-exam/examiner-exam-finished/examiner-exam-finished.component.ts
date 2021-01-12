import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/services/exam.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentExam, Student } from 'src/app/app.model';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { StudentService } from 'src/app/services/student.service';
import { StudentExamService } from 'src/app/services/student.exam.service';


@Component({
  selector: 'app-examiner-exam-finished',
  templateUrl: './examiner-exam-finished.component.html',
  styleUrls: ['./examiner-exam-finished.component.css']
})
export class ExaminerExamFinishedComponent implements OnInit {

  public studentExams: StudentExam[];
  public examName: string;
  public students: Student[];

  constructor(private examService: ExamService, private route: ActivatedRoute,
              private studentService: StudentService, private router: Router, private studentExamService: StudentExamService) { }

  ngOnInit() {
    const examId = this.route.snapshot.params.id;
    this.studentExamService.getAllStudentExamsWithExamId(examId).subscribe(studentExams => {
      this.studentExams = studentExams;
      let studentIds = '';
      for (const studentExam of studentExams) {
        studentIds += studentExam.studentId + ',';
      }
      this.studentService.getStudentByIds(studentIds).subscribe(students => {
        this.students = students;
      });
    });
    this.examService.getExamById(examId).subscribe(exam => {
      this.examName = exam.name;
    });
  }

  download() {
    const data = document.getElementById('test');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }

  htmlToElements(html: string) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
  }

  openStudentExam(studentExamId: number) {
    this.router.navigate(['/examiner/studentexam/detail', studentExamId]);
  }

  getStudentName(studentId: number): string {
    const student = this.students.find(s => s.id === studentId);
    return student.firstname + ' ' + student.lastname;
  }

}
