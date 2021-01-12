import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Task, Exam, Exercise, Examiner } from '../app.model';
import { UploadListComponent } from './upload-list/upload-list.component';
import { ExamService } from '../services/exam.service';
import { ExerciseService } from '../services/exercise.service';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessModalComponent } from '../modal/success-modal/success-modal.component';
import { ConfirmModalComponent } from '../modal/confirm-modal/confirm-modal.component';
import { CreateTasksComponent } from './create-tasks/create-tasks.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @ViewChild(UploadListComponent, { static: false })
  private uploadList: UploadListComponent;

  @ViewChild(CreateTasksComponent, { static: false })
  private createTasks: CreateTasksComponent;

  public form: FormGroup;
  public updateInfo = true;
  public errorMessage: string;

  constructor(private fb: FormBuilder, private taskService: TaskService,
              private examService: ExamService, private exerciseService: ExerciseService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.createForm();
    this.taskService.currentTaskUpload.subscribe((task: any) => {
      if (task !== '') {
        this.createTasks.task = task;
      }
    });
  }

  private createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      isExam: [null, Validators.required],
      category: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  private formToModel() {
    const formValues = this.form.controls;
    formValues.isExam.setValue((formValues.isExam.value === 'true'));
    const examinerId: number = this.getExaminerId();
    if (formValues.isExam.value === true) {
      return new Exam(
        -1,
        formValues.name.value,
        examinerId,
        this.uploadList.taskList,
        '',
        formValues.startDate.value,
        formValues.endDate.value
      );
    } else {
      return new Exercise(
        -1,
        formValues.name.value,
        examinerId,
        formValues.category.value,
        this.uploadList.taskList
      );
    }
  }

  private getExaminerId() {
    const currentUser = localStorage.getItem('currentUser');
    const jsonObject = JSON.parse(currentUser);
    const examinerId: number = jsonObject.examinerId;
    return examinerId;
  }

  public saveTask(task: Task) {
    const taskIndex = this.uploadList.taskList.findIndex(t => t.id === task.id);
    if (taskIndex === -1) {
      this.uploadList.taskList.push(task);
    } else {
      this.uploadList.taskList[taskIndex] = task;
    }
  }

  public deleteTask(taskId: number) {
    const taskIndex = this.uploadList.taskList.findIndex(t => t.id === taskId);
    if (taskIndex) {
      this.uploadList.taskList = this.uploadList.taskList.filter(task => task.id !== taskId);
    }
  }

  public deselectActiveTask(event: any) {
    this.uploadList.deselectTask();
  }

  public upload() {
    const me = this;
    const modalRefConfirm = me.modalService.open(ConfirmModalComponent);
    modalRefConfirm.componentInstance.text = 'Wollen Sie die Übung/Klausur wirklich hochladen?';

    modalRefConfirm.result.then(confirmation => {
      if (confirmation === 'yes') {
        const test: Exam | Exercise = this.formToModel();
        if (test instanceof Exam) {
          this.examService.uploadExam(test).subscribe(result => {
            me.createForm();
            this.uploadList.taskList = [];
            const modalRefSuccess = me.modalService.open(SuccessModalComponent);
          });
        } else if (test instanceof Exercise) {
          this.exerciseService.uploadExercise(test).subscribe(result => {
            me.createForm();
            this.uploadList.taskList = [];
            const modalRefSuccess = me.modalService.open(SuccessModalComponent);
          });
        }
      }
    });
  }
}
