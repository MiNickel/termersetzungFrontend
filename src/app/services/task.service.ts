import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Task} from '../app.model';

@Injectable({providedIn: 'root'})
export class TaskService {

  public taskUploadComponent = new BehaviorSubject<any>('');

  public currentTaskUpload = this.taskUploadComponent.asObservable();

  public taskExaminerExerciseComponent = new BehaviorSubject<any>('');

  public currentTaskExaminerExercise = this.taskExaminerExerciseComponent.asObservable();

  public taskExaminerExamComponent = new BehaviorSubject<any>('');

  public currentTaskExaminerExam = this.taskExaminerExamComponent.asObservable();

  constructor() {
  }

  changeTaskUpload(task: Task) {
    this.taskUploadComponent.next(task);
  }

  changeTaskExaminerExercise(task: Task) {
    this.taskExaminerExerciseComponent.next(task);
  }

  changeTaskExaminerExam(task: Task) {
    this.taskExaminerExamComponent.next(task);
  }

}
