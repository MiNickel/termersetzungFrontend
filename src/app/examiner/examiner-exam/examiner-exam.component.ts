import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { Exam, Examiner, Exercise, Task } from '../../app.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExaminerTasklistComponent } from '../examiner-tasklist/examiner-tasklist.component';
import { TaskService } from '../../services/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/modal/confirm-modal/confirm-modal.component';
import { SuccessModalComponent } from 'src/app/modal/success-modal/success-modal.component';
import { CreateTasksComponent } from 'src/app/upload/create-tasks/create-tasks.component';

@Component({
  selector: 'app-examiner-exam',
  templateUrl: './examiner-exam.component.html',
  styleUrls: ['./examiner-exam.component.scss']
})
export class ExaminerExamComponent implements OnInit {

  public form: FormGroup;
  public showPassword: boolean;
  public created = false;

  @ViewChild(ExaminerTasklistComponent, { static: false })
  private taskList: ExaminerTasklistComponent;

  @ViewChild(CreateTasksComponent, { static: false })
  private createTasks: CreateTasksComponent;

  constructor(private route: ActivatedRoute, private examService: ExamService, private fb: FormBuilder,
              private taskService: TaskService, private modalService: NgbModal) {
  }

  ngOnInit() {
    const examId = this.route.snapshot.params.id;
    this.examService.getExamById(examId).subscribe((exam: Exam) => {
      this.createForm(exam);
      this.created = true;
      this.taskList.taskList = exam.tasks;
    });
    this.taskService.currentTaskExaminerExam.subscribe((task: any) => {
      if (task !== '') {
        this.createTasks.task = task;
      }
    });
  }

  private createForm(exam: Exam) {
    this.form = this.fb.group({
      id: [{ value: exam.id, disabled: true }, Validators.required],
      name: [exam.name, Validators.required],
      code: [{ value: exam.code, disabled: true }, Validators.required],
      startDate: [new Date(exam.startDate), Validators.required],
      endDate: [new Date(exam.endDate), Validators.required]
    });
    console.log(this.form);
  }

  private formToModel() {
    const formValues = this.form.controls;
    const examinerId: number = this.getExaminerId();
    return new Exam(
      formValues.id.value,
      formValues.name.value,
      examinerId,
      this.taskList.taskList,
      formValues.code.value,
      formValues.startDate.value,
      formValues.endDate.value
    );
  }

  private getExaminerId() {
    const currentUser = localStorage.getItem('currentUser');
    const jsonObject = JSON.parse(currentUser);
    const examinerId: number = jsonObject.examinerId;
    return examinerId;
  }

  changePasswordState() {
    this.showPassword = !this.showPassword;
  }

  upload() {
    const me = this;
    const modalRefConfirm = me.modalService.open(ConfirmModalComponent).result.then(confirmation => {
      if (confirmation === 'yes') {
        const exam: Exam = this.formToModel();
        this.examService.uploadExam(exam).subscribe(result => {
          const modalRefSuccess = me.modalService.open(SuccessModalComponent);
        });
      }
    });
  }

  public saveTask(task: Task) {
    const taskIndex = this.taskList.taskList.findIndex(t => t.id === task.id);
    if (taskIndex === -1) {
      this.taskList.taskList.push(task);
    } else {
      this.taskList.taskList[taskIndex] = task;
    }
  }

  public deleteTask(taskId: number) {
    const taskIndex = this.taskList.taskList.findIndex(t => t.id === taskId);
    if (taskIndex) {
      this.taskList.taskList = this.taskList.taskList.filter(task => task.id !== taskId);
    }
  }

  public deselectActiveTask(event: any) {
    this.taskList.deselectTask();
  }

}
