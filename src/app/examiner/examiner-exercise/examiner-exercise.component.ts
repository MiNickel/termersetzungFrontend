import { Component, OnInit, ViewChild } from '@angular/core';
import { ExaminerTasklistComponent } from '../examiner-tasklist/examiner-tasklist.component';
import { Exam, Examiner, Exercise, Task } from '../../app.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../../services/exercise.service';
import { TaskService } from '../../services/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/modal/confirm-modal/confirm-modal.component';
import { SuccessModalComponent } from 'src/app/modal/success-modal/success-modal.component';
import { CreateTasksComponent } from 'src/app/upload/create-tasks/create-tasks.component';

@Component({
  selector: 'app-examiner-exercise',
  templateUrl: './examiner-exercise.component.html',
  styleUrls: ['./examiner-exercise.component.scss']
})
export class ExaminerExerciseComponent implements OnInit {

  public form: FormGroup;
  public created = false;


  @ViewChild(ExaminerTasklistComponent, { static: false })
  private taskList: ExaminerTasklistComponent;

  @ViewChild(CreateTasksComponent, { static: false })
  private createTasks: CreateTasksComponent;

  constructor(private route: ActivatedRoute, private exerciseService: ExerciseService,
              private fb: FormBuilder, private taskService: TaskService, private modalService: NgbModal) {
  }

  ngOnInit() {
    const exerciseId = this.route.snapshot.params.id;
    this.exerciseService.getExerciseByIdForExaminer(exerciseId).subscribe((exercise: Exercise) => {
      this.createForm(exercise);
      this.created = true;
      this.taskList.taskList = exercise.tasks;
    });
    this.taskService.currentTaskExaminerExercise.subscribe((task: any) => {
      if (task !== '') {
        this.createTasks.task = task;
      }
    });
  }

  private createForm(exercise: Exercise) {
    this.form = this.fb.group({
      id: [{ value: exercise.id, disabled: true }, Validators.required],
      name: [exercise.name, Validators.required],
      category: [exercise.category, Validators.required]
    });
  }

  private formToModel() {
    const formValues = this.form.controls;
    const examinerId: number = this.getExaminerId();
    return new Exercise(
      formValues.id.value,
      formValues.name.value,
      examinerId,
      formValues.category.value,
      this.taskList.taskList
    );
  }

  private getExaminerId() {
    const currentUser = localStorage.getItem('currentUser');
    const jsonObject = JSON.parse(currentUser);
    const examinerId: number = jsonObject.examinerId;
    return examinerId;
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

  public upload() {
    const me = this;
    const modalRefConfirm = me.modalService.open(ConfirmModalComponent);
    modalRefConfirm.componentInstance.text = 'Wollen Sie die Übung wirklich hochladen?';
    modalRefConfirm.result.then(confirmation => {
      if (confirmation === 'yes') {
        const exercise: Exercise = this.formToModel();
        this.exerciseService.uploadExercise(exercise).subscribe(result => {
          const modalRefSuccess = me.modalService.open(SuccessModalComponent);
        });
      }
    });
  }

}
