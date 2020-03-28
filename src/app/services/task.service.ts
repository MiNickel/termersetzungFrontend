import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Task} from '../app.model';

@Injectable({providedIn: 'root'})
export class TaskService {

  public task = new BehaviorSubject<any>('');

  public currentTask = this.task.asObservable();

  constructor() {
  }

  changeTask(task: Task) {
    this.task.next(task);
  }

}
