import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Task, Exam, Exercise, Examiner} from '../app.model';
import {UploadListComponent} from './upload-list/upload-list.component';
import {ExamService} from '../services/exam.service';
import {ExerciseService} from '../services/exercise.service';
import {TaskService} from '../services/task.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @ViewChild(UploadListComponent, {static: false})
  private uploadList: UploadListComponent;

  public form: FormGroup;
  public tasks: Task[] = [];
  public task: Task;
  public updateInfo = true;
  public errorMessage: string;

  constructor(private fb: FormBuilder, private taskService: TaskService,
              private examService: ExamService, private exerciseService: ExerciseService) {
  }

  ngOnInit() {
    this.createForm();
    this.taskService.currentTask.subscribe((task: any) => {
      if (task !== '') {
        this.task = task;
      }
    });
  }

  private createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      isExam: [null, Validators.required],
      examiner: new FormGroup({
        firstname: new FormControl(''),
        lastname: new FormControl('')
      }),
      category: ['', Validators.required]
    });
  }

  private formToModel() {
    const formValues = this.form.controls;
    formValues.isExam.setValue((formValues.isExam.value === 'true'));
    if (formValues.isExam.value === true) {
      return new Exam(
        -1,
        formValues.name.value,
        new Examiner(-1, formValues.examiner.get('firstname').value, formValues.examiner.get('lastname').value),
        this.tasks,
        '',
        null,
        null
      );
    } else {
      return new Exercise(
        -1,
        formValues.name.value,
        new Examiner(-1, formValues.examiner.get('firstname').value, formValues.examiner.get('lastname').value),
        formValues.category.value,
        this.tasks
      );
    }
  }

  public createTasks() {
    if (this.form.valid) {
      this.updateInfo = false;
    } else {
      this.errorMessage = 'Sie müssen alle Felder ausfüllen.';
    }
  }

  public getTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.updateInfo = true;
  }

  public saveTask(task: Task) {
    const taskIndex = this.tasks.findIndex(t => t.id === task.id);
    if (taskIndex === -1) {
      this.tasks.push(task);
      this.uploadList.taskList.push(task);
    } else {
      this.tasks[taskIndex] = task;
      this.uploadList.taskList[taskIndex] = task;
    }
  }

  public upload() {
    const test: Exam | Exercise = this.formToModel();
    if (test instanceof Exam) {
      this.examService.uploadExam(test).subscribe(result => {
      });
    } else if (test instanceof Exercise) {
      this.exerciseService.uploadExercise(test).subscribe(result => {
      });
    }
  }
}
