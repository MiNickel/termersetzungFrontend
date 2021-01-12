import { Component, OnInit, ViewChild } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { Exam, Step, Task, StudentExam } from '../app.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExamListComponent } from './exam-list/exam-list.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../modal/confirm-modal/confirm-modal.component';
import { StudentExamService } from '../services/student.exam.service';
import { SuccessModalComponent } from '../modal/success-modal/success-modal.component';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  public code = '';
  public exam: StudentExam;
  public activeInputElement: any;
  public error: string;
  public newTerm = '';
  public task: Task;
  public editStepBool: boolean[] = [false];
  public form: FormGroup;

  @ViewChild(ExamListComponent, { static: false })
  public examList: ExamListComponent;

  constructor(private examService: ExamService, private fb: FormBuilder,
    // tslint:disable-next-line: align
    private modalService: NgbModal, private studentExamService: StudentExamService, private router: Router) {
  }

  ngOnInit() {
    this.examService.currentTask.subscribe((task: any) => {
      if (this.task !== undefined) {
        this.saveCurrentTask();
      }
      if (task !== '') {
        this.newTerm = '';
        this.task = task;
        this.getTaskState();
      }
    });
    this.createForm();
    this.onFormChange();
  }

  getExam() {
    const me = this;
    this.error = undefined;
    const studentId = me.getStudentId();
    const studentFullname = me.getStudentName();
    const firstname = studentFullname.split(' ')[0];
    const lastname = studentFullname.split(' ')[1];
    this.studentExamService.getExamForStudent(this.code, studentId, firstname, lastname).subscribe(exam => {
      this.exam = exam;
      me.examList.taskList = exam.tasks;
    }, e => {
      this.error = e.error.message;
    });
  }

  createForm() {
    this.form = this.fb.group({
      taskState: ['', Validators.required]
    });
  }

  onFormChange() {
    this.form.get('taskState').valueChanges.subscribe(val => {
      this.examService.changeTaskState(this.task.name, val);
    });
  }

  getTaskState() {
    this.form.controls.taskState.setValue(this.examList.taskStateMap.get(this.task.name));
  }

  saveCurrentTask() {
    const index: number = this.examList.taskList.findIndex(task => task.name === this.task.name);
    this.examList.taskList[index] = this.task;
  }

  onFocus(event: any) {
    this.activeInputElement = event.target;
  }

  setSymbol(symbol: string) {
    this.activeInputElement.value += symbol;
  }

  editStep(index: number) {
    this.editStepBool[index] = this.editStepBool[index] !== true;
  }

  removeStep(index: number) {
    this.task.steps.splice(index, 1);
  }

  nextStep() {
    this.task.steps.push(new Step(-1, this.newTerm, 0, ''));
    this.newTerm = '';
    this.editStepBool.push(false);
  }

  save() {
    const modalRefConfirm = this.modalService.open(ConfirmModalComponent);
    modalRefConfirm.componentInstance.text = 'Wollen Sie die Klausur wirklich hochladen?';

    modalRefConfirm.result.then(confirmation => {
      if (confirmation === 'yes') {
        this.saveCurrentTask();
        this.exam.tasks = this.examList.taskList;
        this.exam.studentId = this.getStudentId();
        this.studentExamService.correctStudentExam(this.exam).subscribe(result => {
          this.exam = undefined;
          this.task = undefined;
          this.code = '';
          this.examList.taskList = [];
          const modalRefSuccess = this.modalService.open(SuccessModalComponent);
        });
      }
    });
  }

  private getStudentId(): number {
    const currentUser = localStorage.getItem('currentUser');
    const jsonObject = JSON.parse(currentUser);
    const studentId: number = jsonObject.studentId;
    return studentId;
  }

  private getStudentName() {
    const currentUser = localStorage.getItem('currentUser');
    const jsonObject = JSON.parse(currentUser);
    const studentName: string = jsonObject.fullname;

    return studentName;
  }

  confirmExit() {
    const me = this;
    const modalRefConfirm = me.modalService.open(ConfirmModalComponent);
    modalRefConfirm.componentInstance.text = 'Wollen Sie die Seite wirklich verlassen?';

    modalRefConfirm.result.then(confirmation => {
      if (confirmation === 'yes') {
        return true;
      } else {
        return false;
      }
    });
  }
}
